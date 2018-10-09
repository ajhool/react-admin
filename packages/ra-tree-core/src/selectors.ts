export const getIsNodeExpanded = (state: any, resource: string, nodeId: number): boolean =>
    (state[resource] && state[resource][nodeId]) || false;
