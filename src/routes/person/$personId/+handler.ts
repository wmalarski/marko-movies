import * as v from "valibot";
import { getPerson } from "../../../services/tmdb";
import { getIntegerValidation } from "../../../utils/validation";

export const GET: MarkoRun.Handler = async (context, next) => {
  const params = await v.parseAsync(
    v.object({ personId: getIntegerValidation() }),
    context.params,
  );
  const person = await getPerson({
    context: context.tmdb,
    id: params.personId,
  });

  context.person = person;

  context.meta.pageTitle = `${person.name} - Marko Run Movies`;

  context.serializedGlobals.person = true;

  return next();
};
