import type { TMDBContext } from "../services/tmdb";
import type {
  Collection,
  Genre,
  MediaBase,
  MovieExtraDetails,
  PersonDetails,
  TvExtraDetails,
} from "../services/types";

declare module "@marko/run" {
  export interface Context {
    collection: Collection<MediaBase>;
    genre: Genre;
    movie: MovieExtraDetails;
    tvShow: TvExtraDetails;
    person: PersonDetails;
    tmdb: TMDBContext;
  }
}

export {};
