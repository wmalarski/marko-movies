import * as v from "valibot";
import { getTrendingTv, getTvShows } from "../../../../../services/tmdb";
import { getNameValidation, getPageValidation } from "../../../../../utils/validation";

export const GET: MarkoRun.Handler = async (context) => {
  const parseResult = await v.parseAsync(
    v.object({
      name: getNameValidation(),
      page: getPageValidation(),
    }),
    { ...context.params, ...Object.fromEntries(context.url.searchParams) },
  );

  const tvShows =
    parseResult.name === "trending"
      ? await getTrendingTv({ context: context.tmdb, page: parseResult.page })
      : await getTvShows({
        context: context.tmdb,
        page: parseResult.page,
        query: parseResult.name,
      });

  return new Response(JSON.stringify(tvShows), { status: 200 });
};
