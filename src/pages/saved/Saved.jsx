import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Movies from "../../components/movies/Movies";
import { useTranslation } from "react-i18next";

const Saved = () => {
  const { t } = useTranslation();
  const movies = useSelector((s) => s.saved.value);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-[80vh]">
      <div className=" container ">
        {movies.length > 0 ? (
          <div className="text-center text-red-500 text-2xl font-semibold max-[600px]:text-sm">
            <h1>{t("saved_messages.title")}</h1>
            <Movies data={[...movies].reverse()} bg={"bg-black"} />
          </div>
        ) : (
          <>
            <div className="text-center text-4xl dark:text-red-500 font-bold py-4 max-[600px]:text-2xl">
              {t("saved_messages.empty_title")}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Saved;
