import {
  coerce,
  integer,
  minLength,
  minValue,
  number,
  object,
  parseAsync,
  string,
} from "valibot";
import { getTrendingTv, getTvShows } from "../../../../../services/tmdb";

export const GET: MarkoRun.Handler = async (context) => {
  const parseResult = await parseAsync(
    object({
      name: string([minLength(1)]),
      page: coerce(number([integer(), minValue(1)]), Number),
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
