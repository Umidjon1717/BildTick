import React, { memo } from "react";
import MovieItem from "./MovieItem";

const Movies = ({ data, bg }) => {
  return (
    <div className="dark:bg-black container py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.map((movie) => (
        <MovieItem key={movie?.id} data={movie} {...movie} bg={bg} />
      ))}
    </div>
  );
};

export default memo(Movies);
