import React from "react";
import Loading from "../loading/Loading";

const LazyLoading = () => {
  return (
    <div className="text-center text-2xl min-h-screen flex justify-center items-center text-red-600 ">
      {" "}
      <Loading />
    </div>
  );
};

export default LazyLoading;
