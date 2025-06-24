import { getTags } from "@/lib/actions/tag.actions";
import React from "react";

const Tags = async () => {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
    // query: "test",
  });

  const { tags } = data || {};

  console.log("TAGS", JSON.stringify(tags, null, 2));
  return <div></div>;
};

export default Tags;
