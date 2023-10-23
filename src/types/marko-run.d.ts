declare module "@marko/run" {
  export interface Context {
    tmdb: import("../services/tmdb").TMDBContext;
  }
}

export {};
