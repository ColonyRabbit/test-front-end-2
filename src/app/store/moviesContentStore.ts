import { create } from "zustand";
import { movieAPI } from "../service/movieAPI";
import { IMoviesContent } from "../type/moviesContentType";

type MoviesContentStore = {
  // Array of movies
  movies: IMoviesContent;
  //setter function to set the movie
  getallMovie: (search?: string) => Promise<IMoviesContent>;
};

export const useMoviesContentStore = create<MoviesContentStore>((set) => ({
  movies: {} as IMoviesContent,
  //function to set the movie
  getallMovie: async (search?: string): Promise<IMoviesContent> => {
    try {
      const response = await movieAPI.getMovies(search);
      set(() => ({
        movies: response,
      }));
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));
