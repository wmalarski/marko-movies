import { coerce, integer, minValue, number, object, parseAsync } from "valibot";
import { getMediaByGenre } from "../../../../services/tmdb";

export const GET: MarkoRun.Handler = async (context, next) => {
  const parseResult = await parseAsync(
    object({ genreId: coerce(number([minValue(0), integer()]), Number) }),
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
