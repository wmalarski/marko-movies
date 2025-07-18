import * as v from "valibot";
import { getMovie } from "../../../services/tmdb";
import { getIntegerValidation } from "../../../utils/validation";

const handler: MarkoRun.Handler = async (context, next) => {
  const paramsSchema = v.object({
    movieId: getIntegerValidation(),
  });
  const params = await v.parseAsync(paramsSchema, context.params);

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
