import React, { ReactNode } from "react";

import LeftSiderbar from "@/components/navigation/LeftSiderbar";
import Navbar from "@/components/navigation/navbar";
import RightSiderbar from "@/components/navigation/RightSiderbar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />

      <div className="flex">
        <LeftSiderbar />

        <section className="flex min-h-screen flex-1  flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        <RightSiderbar />
      </div>
    </main>
  );
};

export default RootLayout;
