import { IMoviesContent } from "../type/moviesContentType";

export const movieAPI = {
  //get all movies
  getMovies: async (search?: string): Promise<IMoviesContent> => {
    if (search) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=159298fbf5abf0e0a412a3a9c427a008&query=${search}`
      );
      return response.json();
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=159298fbf5abf0e0a412a3a9c427a008&query=a`
    );
    return response.json();
  },
};
