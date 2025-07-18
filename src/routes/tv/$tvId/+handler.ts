import * as v from "valibot";
import { getTvShow } from "../../../services/tmdb";
import { getIntegerValidation } from "../../../utils/validation";

export const GET: MarkoRun.Handler = async (context, next) => {
  const params = await v.parseAsync(
    v.object({ tvId: getIntegerValidation() }),
    context.params,
  );
  const tvShow = await getTvShow({ context: context.tmdb, id: params.tvId });

  context.tvShow = tvShow;

  context.meta.pageTitle = `${tvShow.name} - Marko Run Movies`;

  context.serializedGlobals.tvShow = true;

  return next();
};
