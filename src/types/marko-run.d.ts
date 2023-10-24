declare module "@marko/run" {
  export interface Context {
    tmdb: import("../services/tmdb").TMDBContext;
    movie?: Promise<import("../services/types").MovieExtraDetails>;
  }
}

export {};
