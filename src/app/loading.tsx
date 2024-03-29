"use client";

import React, { useContext } from "react";
import Loading from "../components/ui/loading";

const LoadingMyLibrary = () => {
  return (
    <div className="absolute inset-0 h-screen w-screen flex justify-center items-center z-[60]">
      <Loading spinnerClassName="w-20 h-20" />
    </div>
  );
};

export default LoadingMyLibrary;
