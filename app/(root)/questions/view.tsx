"use client";

import { incrementViews } from "@/lib/actions/question.action";
import React, { useEffect } from "react";
import { toast } from "sonner";

const View = ({ questionId }: { questionId: string }) => {
  const handleIncrement = async () => {
    const result = await incrementViews({ questionId });

    if (result.success) {
      toast.success("Success", {
        description: "Views incremented",
      });
    } else {
      toast.error("Error", {
        description: result.error?.message,
      });
    }
  };

  useEffect(() => {
    handleIncrement();
  }, []);
  return null;
};

export default View;
