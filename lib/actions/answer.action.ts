"use server";

import Answer, { IAnswerDoc } from "@/database/answer.model";
import {
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswerParams,
} from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";
import {
  AnswerServerSchema,
  DeleteAnswerSchema,
  GetAnswersSchema,
} from "../validations";
import action from "../handles/action";
import handleError from "../handles/error";
import mongoose from "mongoose";
import { Question } from "@/database";
import { NotFoundError, UnauthorizedError } from "../http-errors";
import { realmPlugin } from "@mdxeditor/editor";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";
import { Vote } from "@/database";

export async function createAnswer(
  params: CreateAnswerParams
): Promise<ActionResponse<IAnswerDoc>> {
  const validationResult = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { content, questionId } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId);
    if (!question) throw new NotFoundError("Question not found");

    const [newAnswer] = await Answer.create(
      [
        {
          author: userId,
          question: questionId,
          content,
        },
      ],
      { session }
    );

    if (!newAnswer) throw new Error("Failed to create answer.");

    question.answers += 1;
    await question.save({ session });

    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTION(questionId));

    return { success: true, data: JSON.parse(JSON.stringify(newAnswer)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function getAnswers(params: GetAnswerParams): Promise<
  ActionResponse<{
    answers: Answer[];
    isNext: boolean;
    totalAnswers: number;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetAnswersSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId, page = 1, pageSize = 10, filter } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  let sortCrieria = {};

  switch (filter) {
    case "latest":
      sortCrieria = { createdAt: -1 };
      break;
    case "oldest":
      sortCrieria = { createdAt: 1 };
      break;
    case "popular":
      sortCrieria = { upvotes: -1 };
      break;
    default:
      sortCrieria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name image")
      .sort(sortCrieria)
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteAnswer(
  params: DeleteAnswerParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: DeleteAnswerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { answerId } = validationResult.params!;
  const { user } = validationResult.session!;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const answer = await Answer.findById(answerId).session(session);
    if (!answer) throw new NotFoundError("Answer not found.");

    if (answer.author._id.toString() !== user?.id)
      throw new UnauthorizedError(
        "You are not authorized to delete this answer."
      );

    //Reduce the relate question answers count
    await Question.findByIdAndUpdate(
      answer.question,
      { $inc: { answers: -1 } },
      { new: true }
    ).session(session);

    //Delete votes associate with answer
    await Vote.deleteMany({ actionId: answerId, actionType: "answer" }).session(
      session
    );

    //Delete the answer
    await Answer.findByIdAndDelete(answerId).session(session);

    //Commit transaction
    await session.commitTransaction();
    session.endSession();

    //Revalidate to reflect immediate changes on UI
    revalidatePath(`/profile/${user?.id}`);

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  }
}
