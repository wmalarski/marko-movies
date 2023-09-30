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
import { search } from "../../../services/tmdb";

export const GET: MarkoRun.Handler = async (context) => {
  const parseResult = await parseAsync(
    object({
      query: optional(string(), ""),
      page: coerce(number([integer(), minValue(1)]), Number),
    }),
    Object.fromEntries(context.url.searchParams),
  );

  const result = await search({ context: context.tmdb, ...parseResult });

  return new Response(JSON.stringify(result), { status: 200 });
};
