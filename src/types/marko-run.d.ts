declare module "@marko/run" {
  interface Context {
    tmdb: import("../services/tmdb").TMDBContext;
  }
}
