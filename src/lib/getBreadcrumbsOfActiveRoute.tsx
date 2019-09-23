export function getBreadcrumbsOfActiveRoute (stateTree, path = []) {
    if (stateTree.routeName) path.push(stateTree.routeName);
    if (stateTree.routes)
        getBreadcrumbsOfActiveRoute(stateTree.routes[stateTree.index], path);
    return path;
}
