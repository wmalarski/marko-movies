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
  getTMDBContext,
  getTrendingTv,
  getTvShows,
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
  const tvShows =
    parseResult.name === "trending"
      ? await getTrendingTv({ context, page: parseResult.page })
      : await getTvShows({
          context,
          page: parseResult.page,
          query: parseResult.name,
        });

  return new Response(JSON.stringify(tvShows), { status: 200 });
};
