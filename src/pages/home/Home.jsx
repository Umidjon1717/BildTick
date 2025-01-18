import React, { memo, useEffect, useState } from "react";
import Movies from "@/components/movies/Movies";
import { request } from "@/api";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const { data: movie, isPending } = useQuery({
    queryKey: ["movie"],
    queryFn: () =>
      request
        .get("/discover/movie", {
          params: {
            without_genre: "18,99",
          },
        })
        .then((res) => res.data),
  });
  const location = useLocation();

  return (
    <>
      {isPending && (
        <div className="text-center text-2xl min-h-screen flex justify-center items-center text-red-600 ">
          {" "}
          <Loading />
        </div>
      )}
      <Hero movies={movie?.results} />
      <Movies data={movie?.results} />
    </>
  );
};

export default memo(Home);
