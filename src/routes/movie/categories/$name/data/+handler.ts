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
import {
  getMovies,
  getTMDBContext,
  getTrendingMovie,
} from "../../../../../services/tmbd";

export const GET: MarkoRun.Handler = async (ctx) => {
  const parseResult = await parseAsync(
    object({
      name: string([minLength(1)]),
      page: coerce(number([integer(), minValue(1)]), Number),
    }),
    { ...ctx.params, ...Object.fromEntries(ctx.url.searchParams) },
  );

  const context = getTMDBContext(ctx);

  const movies =
    parseResult.name === "trending"
      ? await getTrendingMovie({ context, page: parseResult.page })
      : await getMovies({
          context,
          page: parseResult.page,
          query: parseResult.name,
        });

  return new Response(JSON.stringify(movies), { status: 200 });
};
