import { coerce, integer, minValue, number, object, parseAsync } from "valibot";
import { getMediaByGenre, getTMDBContext } from "../../../../../services/tmbd";

export const GET: MarkoRun.Handler = async (ctx) => {
  const parseResult = await parseAsync(
    object({
      genreId: coerce(number([minValue(0), integer()]), Number),
      page: coerce(number([integer(), minValue(1)]), Number),
    }),
    { ...ctx.params, ...Object.fromEntries(ctx.url.searchParams) },
  );

  const context = getTMDBContext(ctx);

  const movies = await getMediaByGenre({
    context,
    genre: parseResult.genreId,
    media: "tv",
    page: parseResult.page,
  });

  return new Response(JSON.stringify(movies), { status: 200 });
};