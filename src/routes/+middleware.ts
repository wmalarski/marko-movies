import { getTMDBContext } from "../services/tmdb";

const handler: MarkoRun.Handler = async (context, next) => {
  const tmdb = getTMDBContext();
  context.tmdb = tmdb;
  return next();
};

export default handler;
