import type { TMDBContext } from "../services/tmdb";
import type {
  Collection,
  Genre,
  MediaBase,
  MovieExtraDetails,
} from "../services/types";

declare module "@marko/run" {
  export interface Context {
    tmdb: TMDBContext;
    movie: MovieExtraDetails;
    collection: Collection<MediaBase>;
    genre: Genre;
  }
}

export {};
