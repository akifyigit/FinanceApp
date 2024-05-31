import React from "react";

import Appbar from "../Modules/Appbar";
import Sidebar from "../Modules/Sidebar";

type MainProps = {
  children: React.ReactNode;
};

const Main = (props: MainProps) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Appbar />
      <div className="flex flex-col sm:flex-row h-full w-full">
        <Sidebar />
        <section className="p-4 w-full h-full relative space-y-4 overflow-y-auto overflow-x-hidden">
          {props.children}
        </section>
      </div>
    </div>
  );
};

export default Main;
