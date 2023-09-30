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
import { getMovies, getTrendingMovie } from "../../../../../services/tmdb";

export const GET: MarkoRun.Handler = async (context) => {
  const parseResult = await parseAsync(
    object({
      name: string([minLength(1)]),
      page: coerce(number([integer(), minValue(1)]), Number),
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
