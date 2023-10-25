export const GET: MarkoRun.Handler = async (context, next) => {
  context.meta.pageTitle = `${context.params.name} - Marko Run Movies`;
  return next();
};
