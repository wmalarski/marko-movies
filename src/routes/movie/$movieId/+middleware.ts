import { coerce, integer, minValue, number, object, parseAsync } from "valibot";
import { getMovie } from "../../../services/tmdb";

const handler: MarkoRun.Handler = async (context, next) => {
  const paramsSchema = object({
    movieId: coerce(number([minValue(0), integer()]), Number),
  });
  const params = await parseAsync(paramsSchema, context.params);

  const movie = await getMovie({
    context: context.tmdb,
    id: params.movieId,
  });

  context.movie = movie;

  context.meta.pageTitle = `${movie.title} - Marko Run Movies`;

  context.serializedGlobals.movie = true;

  return next();
};

export default handler;
