import { useMoviesContentStore } from "@/app/store/moviesContentStore";
import { useEffect, useState } from "react";
import Cart from "./Cart";

export default function Search() {
  //local state
  const [search, setSearch] = useState<string>("");
  //global state
  const { getallMovie } = useMoviesContentStore();

  //useEffect
  useEffect(() => {
    const fetchMovies = async (search: string) => {
      await getallMovie(search);
    };
    fetchMovies(search);
  }, [search, getallMovie]);
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="flex w-full max-w-sm items-center border border-gray-300 rounded-lg px-2.5 py-1.5">
        <SearchIcon className="h-4 w-4 mr-2.5" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="search"
          placeholder="Search..."
          className="w-full border-none p-1"
        />
      </div>
      <Cart />
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
