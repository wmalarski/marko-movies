import { coerce, integer, minValue, number, object, parseAsync } from "valibot";
import { getPerson } from "../../../services/tmdb";

export const GET: MarkoRun.Handler = async (context, next) => {
  const params = await parseAsync(
    object({ personId: coerce(number([minValue(0), integer()]), Number) }),
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
