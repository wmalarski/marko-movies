import * as v from "valibot";
import { getMediaByGenre } from "../../../../services/tmdb";
import { getIntegerValidation } from "../../../../utils/validation";

export const GET: MarkoRun.Handler = async (context, next) => {
  const parseResult = await v.parseAsync(
    v.object({ genreId: getIntegerValidation() }),
    context.params,
  );

  const tvShows = await getMediaByGenre({
    context: context.tmdb,
    genre: parseResult.genreId,
    media: "tv",
    page: 1,
  });

  context.collection = tvShows;
  context.genre = tvShows.genre;
  context.meta.pageTitle = `${tvShows.genre.name} - Marko Run Movies`;

  context.serializedGlobals.genre = true;
  context.serializedGlobals.collection = true;

  return next();
};
