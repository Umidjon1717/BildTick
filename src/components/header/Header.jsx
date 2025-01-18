import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { HEADER_LINKS } from "../../static";
import { FaMoon } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../../lang";
import englishFlag from "@/assets/flags/english.png";
import uzbekFlag from "@/assets/flags/uzbek.png";
import russianFlag from "@/assets/flags/russian.png";
import { MdLightMode } from "react-icons/md";

const LANGUAGES = [
  { label: "English", code: "en", flag: englishFlag },
  { label: "Uzbek", code: "uz", flag: uzbekFlag },
  { label: "Russian", code: "ru", flag: russianFlag },
];

const Header = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("dark_mode") || true;
  });
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleDarkMode = () => {
    setDark((prevDark) => {
      const newDarkMode = !prevDark;
      localStorage.setItem("dark_mode", newDarkMode);
      return newDarkMode;
    });
  };

  const changeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
    localStorage.setItem("lang_code", lang_code); // Tanlangan tilni saqlash
  };

  return (
    <header
      id="header"
      className="w-full h-[80px] bg-white dark:bg-black sticky top-0 left-0 z-20 shadow-md"
    >
      <nav className="container relative mx-auto px-4 h-full flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-[112px] h-9 max-[500px]:w-[100px] max-[500px]:h-7"
            />
          </Link>
        </div>
        <ul className="text-black flex dark:text-white gap-10 flex-wrap max-[650px]:fixed max-[650px]:bottom-0 max-[650px]:left-0 max-[650px]:bg-[white] max-[650px]:w-full max-[650px]:justify-evenly max-[650px]:dark:bg-black max-[650px]:-z-50">
          {HEADER_LINKS.map((link) => (
            <li key={link.id} className="flex flex-col items-center">
              <NavLink
                to={link.url}
                className="flex flex-col items-center gap-1 max-[650px]:gap-0 max-[650px]:py-1 max-[650px]:text-[12px]"
              >
                {link.icon}
                <p>{t(`header.nav.${link.title}`)}</p>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <select
            className="bg-gray-300 dark:bg-slate-800 dark:text-white rounded-lg py-2 px-2 outline-none"
            defaultValue={localStorage.getItem("lang_code") || i18n.language}
            onChange={changeLang}
          >
            {LANGUAGES.map((lang) => (
              <option
                key={lang.code}
                value={lang.code}
                className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={toggleDarkMode}
            className="text-2xl text-gray-700 dark:text-white"
          >
            {dark ? <MdLightMode className="text-[gold]" /> : <FaMoon />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
