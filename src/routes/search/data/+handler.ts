import * as v from "valibot";
import { search } from "../../../services/tmdb";
import { getPageValidation } from "../../../utils/validation";

export const GET: MarkoRun.Handler = async (context) => {
  const parseResult = await v.parseAsync(
    v.object({
      query: v.optional(v.string(), ""),
      page: getPageValidation(),
    }),
    Object.fromEntries(context.url.searchParams),
  );

  const result = await search({ context: context.tmdb, ...parseResult });

  return new Response(JSON.stringify(result), { status: 200 });
};
