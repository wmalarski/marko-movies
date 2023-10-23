declare module "@marko/run" {
  export interface Context {
    tmdb: import("../services/tmdb").TMDBContext;
  }
}

declare global {
  namespace Marko {
    export interface Global {
      tmdb: import("../services/tmdb").TMDBContext;
    }
  }
}

export {};
