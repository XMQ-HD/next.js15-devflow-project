import React from "react";

import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log("Session:", session);
  return <div></div>;
};

export default Home;
