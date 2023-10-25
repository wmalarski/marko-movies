import { coerce, integer, minValue, number, object, parseAsync } from "valibot";
import { getTvShow } from "../../../services/tmdb";

export const GET: MarkoRun.Handler = async (context, next) => {
  const params = await parseAsync(
    object({ tvId: coerce(number([minValue(0), integer()]), Number) }),
    context.params,
  );
  const tvShow = await getTvShow({ context: context.tmdb, id: params.tvId });

  context.tvShow = tvShow;

  context.meta.pageTitle = `${tvShow.name} - Marko Run Movies`;

  context.serializedGlobals.tvShow = true;

  return next();
};
