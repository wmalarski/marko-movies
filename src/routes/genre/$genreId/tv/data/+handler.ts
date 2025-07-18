import * as v from "valibot";
import { getMediaByGenre } from "../../../../../services/tmdb";
import { getIntegerValidation, getPageValidation } from "../../../../../utils/validation";

export const GET: MarkoRun.Handler = async (context) => {
  const parseResult = await v.parseAsync(
    v.object({
      genreId: getIntegerValidation(),
      page: getPageValidation(),
    }),
    { ...context.params, ...Object.fromEntries(context.url.searchParams) },
  );

  const movies = await getMediaByGenre({
    context: context.tmdb,
    genre: parseResult.genreId,
    media: "tv",
    page: parseResult.page,
  });

  return new Response(JSON.stringify(movies), { status: 200 });
};
