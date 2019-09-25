/**
 * Checks if the current route is in a stack and is NOT the first route in the stack
 */
export function checkGoBackIsAvailable (navigation) {
    const parent = navigation.dangerouslyGetParent();
    return parent.state.routeName.includes("Stack")
        && parent.state.routes[0].routeName !== navigation.state.routeName;
}
