import { coerce, integer, minValue, number, object, parse } from "valibot";
import { getMovie } from "../../../services/tmdb";

const handler: MarkoRun.Handler = async (context, next) => {
  const paramsSchema = object({
    movieId: coerce(number([minValue(0), integer()]), Number),
  });
  const params = parse(paramsSchema, context.params);

  const moviePromise = getMovie({
    context: context.tmdb,
    id: params.movieId,
  });

  context.movie = moviePromise;

  return next();
};

export default handler;
