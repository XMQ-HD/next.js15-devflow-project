"use client";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const SaveQuestion = ({ questionId }: { questionId: string }) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    if (!userId)
      return toast.error("Faild", {
        description: "You need to be logged in to save a questionId.",
      });

    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });

      if (!success) throw new Error(error?.message || "An error occured.");

      {
        data?.saved
          ? toast.success("Question saved successfully!")
          : toast.error("Question have been unsaved!");
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "An error occured",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasSaved = false;

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && "opacity-50"}`}
      aria-label="save question"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
