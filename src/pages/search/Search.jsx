import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { request } from "@/api";
import Movies from "../../components/movies/Movies";
import { useSearchParams } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["search"],
    queryFn: () =>
      request
        .get("/search/movie", {
          params: {
            without_genre: "18,99",
            query: searchValue,
          },
        })
        .then((res) => res.data),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["search"] });
    setSearchValue(searchValue);
    setSearchParams({ q: searchValue });
  };

  const handleClear = () => {
    setSearchParams({});
    setSearchValue("");
  };

  useEffect(() => {
    if (!searchValue) {
      queryClient.invalidateQueries({ queryKey: ["search"] });
    }
  }, [searchValue]);

  return (
    <div className="container mx-auto p-4  dark:text-white min-h-screen">
      <form
        onSubmit={handleSearch}
        className="max-w-2xl mx-auto flex items-center border rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800"
      >
        <ReactTyped
          strings={["Avengers", "Venom", "Avatar", "Spiderman"]}
          typeSpeed={40}
          backSpeed={50}
          attr="placeholder"
          loop
          className="flex-1"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-3 text-gray-700 dark:text-white bg-transparent focus:outline-none"
            type="text"
          />
        </ReactTyped>
        {searchValue.length ? (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <span>X</span>
          </button>
        ) : null}
        <button
          type="submit"
          className="px-5 py-3 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <CiSearch size={20} />
        </button>
      </form>

      <div className="mt-5">
        {!data?.total_results && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Movie not found
          </p>
        )}
      </div>
      <Movies data={data?.results} />
    </div>
  );
};

export default Search;
