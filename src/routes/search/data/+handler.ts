import {
  coerce,
  integer,
  minValue,
  number,
  object,
  optional,
  parseAsync,
  string,
} from "valibot";
import { getTMDBContext, search } from "../../../services/tmbd";

export const GET: MarkoRun.Handler = async (ctx) => {
  const parseResult = await parseAsync(
    object({
      query: optional(string(), ""),
      page: coerce(number([integer(), minValue(1)]), Number),
    }),
    Object.fromEntries(ctx.url.searchParams),
  );

  const context = getTMDBContext(ctx);

  const result = await search({ context, ...parseResult });

  return new Response(JSON.stringify(result), { status: 200 });
};
