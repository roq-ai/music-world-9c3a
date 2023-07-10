const mapping: Record<string, string> = {
  labels: 'label',
  listeners: 'listener',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
