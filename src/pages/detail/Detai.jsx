import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";
import translate from "translate";

import imdb from "../../assets/images/image.png";
import kinopoisk from "../../assets/images/kinopoisk.png";
import toast, { Toaster } from "react-hot-toast";
import Movies from "../../components/movies/Movies";

const Detail = () => {
  const [translatedCountries, setTranslatedCountries] = useState([]);
  const [translatedGenres, setTranslatedGenres] = useState([]);
  const [translatedJobs, setTranslatedJobs] = useState([]);
  const [translatedCasts, setTranslatedCasts] = useState([]);
  const [desc, setDisc] = useState("");

  translate.engine = "google";
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data, isLoading, error } = useQuery({
    queryKey: [`movie/${id}`],
    queryFn: () =>
      request
        .get(`movie/${id}`, { params: { without_genre: "18,99" } })
        .then((res) => res.data),
  });

  useEffect(() => {
    if (error) {
      toast.error("Film not found !");
      navigate("/");
    }
  }, [error, navigate]);
  const { data: images, isLoading: isImageLoading } = useQuery({
    queryKey: [`movie/${id}/images`],
    queryFn: () => request.get(`movie/${id}/images`).then((res) => res.data),
  });

  const { data: similar, isLoading: isSimilarLoading } = useQuery({
    queryKey: [`movie/${id}/similar`],
    queryFn: () => request.get(`movie/${id}/similar`).then((res) => res.data),
  });

  const { data: credits } = useQuery({
    queryKey: [`movie/${id}/credits`],
    queryFn: () => request.get(`movie/${id}/credits`).then((res) => res.data),
  });

  useEffect(() => {
    const translateAllData = async () => {
      try {
        if (data?.production_countries) {
          const translatedCountries = await Promise.all(
            data.production_countries.map((country) =>
              translate(country.name, "ru")
            )
          );
          setTranslatedCountries(translatedCountries);
        }

        if (data?.genres) {
          const translatedGenres = await Promise.all(
            data.genres.map((genre) => translate(genre.name, "ru"))
          );
          setTranslatedGenres(translatedGenres);
        }

        if (credits?.crew) {
          const translatedCrew = await Promise.all(
            credits.crew
              .filter((member) => member.job === "Director")
              .map((member) => translate(member.name, "ru"))
          );
          setTranslatedJobs(translatedCrew);
        }

        if (credits?.cast) {
          const translatedCasts = await Promise.all(
            credits.cast.slice(0, 5).map(async (member) => ({
              name: await translate(member.name, "ru"),
              character: await translate(member.character, "ru"),
            }))
          );
          setTranslatedCasts(translatedCasts);
        }
      } catch (error) {
        console.error("Tarjima jarayonida xatolik yuz berdi:", error);
      }
    };

    translateAllData();
  }, [data, credits]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}м / ${minutes} минут`;
  };

  if (
    isLoading ||
    isImageLoading ||
    isSimilarLoading ||
    !translatedCountries.length
  ) {
    return (
      <div className="text-center text-2xl min-h-screen flex justify-center items-center text-red-600 ">
        {" "}
        <Loading />
      </div>
    );
  }

  const overviewS = async () => {
    const description = await translate(data?.overview, "ru");
    setDisc(description);
  };

  overviewS();

  return (
    <>
      <div className="min-h-screen  dark:text-white text-black">
        {/* Header Section */}
        <div
          className="relative w-full h-[700px] bg-cover bg-center max-[850px]:h-[500px] max-[600px]:h-[400px] "
          style={{
            backgroundImage: `url(${
              'https://image.tmdb.org/t/p/original' + data.backdrop_path
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
            <div className="container mx-auto px-6 py-8">
              <h1 className="text-5xl font-extrabold max-[500px]:text-3xl">
                {data.title}
              </h1>
              <p className="text-gray-300 mt-2 text-lg">
                Release Date: {data.release_date}
              </p>
              <p className="text-yellow-400 mt-2 text-lg">
                Rating: {data.vote_average} / 10
              </p>
            </div>
          </div>
        </div>
  
        {/* Overview Section */}
        <div className="container mx-auto px-6 py-12 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6">Overview</h2>
          <p className="dark:text-gray-300 mb-10 text-lg leading-relaxed text-center">
            {data.overview}
          </p>
  
          {/* Images Section */}
          {images && images.backdrops.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Images</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                {images.backdrops.slice(0, 10).map((image, index) => (
                  <img
                    key={index}
                    src={'https://image.tmdb.org/t/p/original' + image.file_path}
                    alt="Movie Scene"
                    className="w-64 h-40 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          )}
  
          {/* Details Section */}
          <div className="w-full bg-gray-800 text-white rounded-lg p-8 shadow-xl max-w-4xl">
            <h3 className="text-2xl font-semibold text-center mb-6">Details</h3>
            <div className="grid grid-cols-2 gap-4 text-lg max-[450px]:grid-cols-1">
              <div>
                <p className="font-medium">Runtime</p>
                <p>{formatTime(data?.runtime)}</p>
              </div>
              <div>
                <p className="font-medium">Premiere</p>
                <p>{new Date(data?.release_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Production</p>
                <p>{translatedCountries.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium">Genre</p>
                <p>{translatedGenres.slice(0, 2).join(", ")}</p>
              </div>
            </div>
          </div>
  
          {/* Cast Section */}
          <div className="w-full bg-gray-700 text-white rounded-lg p-8 shadow-xl mt-12 max-w-4xl">
            <h3 className="text-2xl font-semibold text-center mb-6">Cast</h3>
            {translatedCasts.map((member, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b border-gray-600 last:border-none"
              >
                <p>{member.name}</p>
                <p className="text-right">{member.character}</p>
              </div>
            ))}
          </div>
  
          {/* Buy Ticket Section */}
          <div className="mt-12">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-red-700 transition-all">
              Buy Ticket
            </button>
          </div>
        </div>
  
        {/* Similar Movies Section */}
        {similar && similar.results.length > 0 && (
          <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-6">Similar Movies</h2>
            <Movies data={similar?.results?.slice(0, 10)} bg={"bg-black"} />
          </div>
        )}
      </div>
    </>
  );
  
};

export default Detail;
