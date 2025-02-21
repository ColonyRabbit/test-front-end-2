"use client";
import { useMoviesContentStore } from "@/app/store/moviesContentStore";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import Search from "./Search";
import { usePathname } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";

export default function MoviesContent() {
  //global state
  const { getallMovie, movies } = useMoviesContentStore();
  //local state
  const [prices, setPrices] = useState<{ [key: number]: number }>({});
  //usePathname
  const pathname = usePathname();
  //useEffect
  useEffect(() => {
    if (pathname === "/") {
      getallMovie();
    }
  }, [pathname, getallMovie]);
  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem("prices") || "{}");
    setPrices(storedPrices);
  }, []);
  //define movie
  const data = movies.results;
  console.log(data);
  // console.log(data[0].backdrop_path);
  //function
  const handleAddPriceByMovie = (movieId: number, price: number) => {
    setPrices((prevPrices) => {
      const updatedPrices = {
        ...prevPrices,
        [movieId]: price,
      };
      localStorage.setItem("prices", JSON.stringify(updatedPrices));
      return updatedPrices;
    });
  };
  const handleAddtoCart = (
    movieImage: string,
    movieId: number,
    movieName: string,
    price?: number
  ) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const isMovieExist = cart.some(
      (item: { movieImage: string; id: number; name: string; price: number }) =>
        item.id === movieId
    );
    if (isMovieExist) {
      alert("มีสินค้าในตะกร้าแล้ว");
      return;
    }

    const newCartItem = {
      Image: movieImage,
      id: movieId,
      name: movieName,
      price: price || 0,
    };
    cart.push(newCartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="flex flex-col items-center p-2">
      <Search />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 bg-">
        {data?.map((movie, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-950"
          >
            <Link href="#" className="block relative" prefetch={false}>
              <FaCartPlus
                className="absolute top-2 left-2 text-black bg-white w-auto h-auto rounded-full p-4"
                onClick={() => {
                  handleAddtoCart(
                    movie.poster_path as string,
                    movie.id,
                    movie.title,
                    prices[movie.id]
                  );
                }}
              />
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={400}
                height={600}
                className="w-full h-[500px] object-cover"
                style={{ aspectRatio: "400/600", objectFit: "cover" }}
              />
              <p className="absolute top-2 right-2 text-black font-bold p-5 bg-white rounded-3xl">
                ราคา :
                {JSON.parse(localStorage.getItem("prices") || "{}")[movie.id] ||
                  0}
                บาท
              </p>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                {movie.overview}
              </p>
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                placeholder="ระบุราคา"
                value={prices[movie.id] || ""}
                onChange={(e) =>
                  handleAddPriceByMovie(movie.id, Number(e.target.value))
                }
                className="p-2 border rounded w-24"
              />
              <button
                onClick={() =>
                  alert(
                    `ราคาของ ${movie.title} คือ ${prices[movie.id] ?? 0} บาท`
                  )
                }
                className="px-3 py-2 bg-blue-500 text-white rounded "
              >
                ใส่ราคา
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
