import * as v from "valibot";
import { getMediaByGenre } from "../../../../services/tmdb";
import { getIntegerValidation } from "../../../../utils/validation";

export const GET: MarkoRun.Handler = async (context, next) => {
  const parseResult = await v.parseAsync(
    v.object({ genreId: getIntegerValidation() }),
    context.params,
  );

  const movies = await getMediaByGenre({
    context: context.tmdb,
    genre: parseResult.genreId,
    media: "movie",
    page: 1,
  });

  context.collection = movies;
  context.genre = movies.genre;

  context.meta.pageTitle = `${movies.genre.name} - Marko Run Movies`;

  context.serializedGlobals.genre = true;
  context.serializedGlobals.collection = true;

  return next();
};
