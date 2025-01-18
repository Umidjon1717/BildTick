import { MdOutlineMovieCreation } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoSaveOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

export const HEADER_LINKS = [
  {
    id: 1,
    icon: <IoHomeOutline className="text-2xl text-[A1A1A1]" />,
    title: "home",
    url: "/",
  },
  {
    id: 2,
    icon: <MdOutlineMovieCreation className="text-2xl text-[A1A1A1]" />,
    title: "movies",
    url: "/movies",
  },
  {
    id: 3,
    icon: <IoSaveOutline className="text-2xl text-[A1A1A1]" />,
    title: "saved",
    url: "/saved",
  },
  {
    id: 4,
    icon: <IoSearchOutline className="text-2xl text-[A1A1A1]" />,
    title: "search",
    url: "/search",
  },
];
