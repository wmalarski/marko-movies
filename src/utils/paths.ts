type RouteParams<Path extends MarkoRun.Route["path"]> = (MarkoRun.Route & {
  path: Path;
})["params"];

export const buildPath = <Path extends MarkoRun.Route["path"]>(
  path: Path,
  params: RouteParams<Path>,
) => {
  return Object.entries(params).reduce<string>(
    (prev, [param, value]) => prev.replaceAll(`:${param}`, value as string),
    path,
  );
};
