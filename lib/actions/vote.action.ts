"use server";

import {
  CreateVoteParams,
  HasVotedParams,
  HasVotedResponse,
  UpdateVoteCountParams,
} from "@/types/action";
import {
  CreateVoteSchema,
  HasVotedSchema,
  UpdateVoteCountSchema,
} from "../validations";
import { ActionResponse, ErrorResponse } from "@/types/global";
import action from "../handles/action";
import handleError from "../handles/error";
import mongoose, { ClientSession } from "mongoose";
import { Answer, Question, Vote } from "@/database";

export async function updateVoteCount(
  params: UpdateVoteCountParams,
  session?: ClientSession
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: UpdateVoteCountSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ActionResponse;
  }

  const { targetId, targetType, voteType, change } = validationResult.params!;

  const Model = targetType === "question" ? Question : Answer;
  const voteField = voteType === "upvote" ? "upvotes" : "downvotes";

  try {
    const result = await Model.findByIdAndUpdate(
      targetId,
      { $inc: { [voteField]: change } },
      { new: true, session }
    );

    if (!result) {
      return handleError(
        new Error("Failed to update vote count")
      ) as ErrorResponse;
    }
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function createVote(
  params: CreateVoteParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: CreateVoteSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ActionResponse;
  }

  const { targetId, targetType, voteType } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId) {
    handleError(new Error("Unauthorized")) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingVote = await Vote.findOne({
      author: userId,
      actionId: targetId,
      actionType: targetType,
    }).session(session);

    if (existingVote) {
      if (existingVote === voteType) {
        // If the user have voted this type before, now delete vote record and substract vote number.
        await Vote.deleteOne({ _id: existingVote._id }).session(session);
        await updateVoteCount(
          { targetId, targetType, voteType, change: -1 },
          session
        );
      } else {
        // If the user have voted a opposite type before, update vote.
        await Vote.findByIdAndUpdate(
          existingVote._id,
          { voteType },
          { new: true, session }
        );
        // First update the vote type which the user choice
        await updateVoteCount(
          { targetId, targetType, voteType, change: 1 },
          session
        );
        //Todo update the opposite vote type, the user cannot voted two type vote either.
      }
    } else {
      // If the user has not yet, create a vote.
      await Vote.create([{ targetId, targetType, voteType, change: 1 }], {
        session,
      });

      await updateVoteCount(
        { targetId, targetType, voteType, change: 1 },
        session
      );
    }

    await session.commitTransaction();
    session.endSession();

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  }
}

export async function hasVoted(
  params: HasVotedParams
): Promise<ActionResponse<HasVotedResponse>> {
  const validationResult = await action({
    params,
    schema: HasVotedSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { targetId, targetType } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const vote = await Vote.findOne({
      author: userId,
      actionId: targetId,
      actionType: targetType,
    });

    if (!vote) {
      return {
        success: false,
        data: { hasUpvoted: false, hasDownvoted: false },
      };
    }

    return {
      success: true,
      data: {
        hasUpvoted: vote.voteType === "upvote",
        hasDownvoted: vote.voteType === "doenvote",
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
