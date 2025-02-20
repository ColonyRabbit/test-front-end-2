"use client";
import { useMoviesContentStore } from "@/app/store/moviesContentStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import Search from "./Search";

export default function MoviesContent() {
  /**
   * v0 by Vercel.
   * @see https://v0.dev/t/FqKj0vkgXRO
   * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
   */
  //global state
  const { getallMovie, movies } = useMoviesContentStore();
  //useEffect
  useEffect(() => {
    getallMovie();
  }, []);
  //define movie
  const data = movies.results;
  // console.log(data[0].backdrop_path);
  return (
    <div className="flex flex-col items-center p-2">
      <Search />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 bg-">
        {data?.map((movie, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-950"
          >
            <Link href="#" className="block" prefetch={false}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={400}
                height={600}
                className="w-full h-[500px] object-cover"
                style={{ aspectRatio: "400/600", objectFit: "cover" }}
              />
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
