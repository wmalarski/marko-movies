import * as v from "valibot";
import { getMovies, getTrendingMovie } from "../../../../../services/tmdb";
import { getNameValidation, getPageValidation } from "../../../../../utils/validation";

export const GET: MarkoRun.Handler = async (context) => {
  const parseResult = await v.parseAsync(
    v.object({
      name: getNameValidation(),
      page: getPageValidation(),
    }),
    { ...context.params, ...Object.fromEntries(context.url.searchParams) },
  );

  const movies =
    parseResult.name === "trending"
      ? await getTrendingMovie({
        context: context.tmdb,
        page: parseResult.page,
      })
      : await getMovies({
        context: context.tmdb,
        page: parseResult.page,
        query: parseResult.name,
      });

  return new Response(JSON.stringify(movies), { status: 200 });
};
