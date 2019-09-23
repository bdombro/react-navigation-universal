/**
 * Return an intersection array of two or multiple arrays
 *
 * Example: ArrayIntersection([1,2], [1]) => [1]
 */
export function arrayIntersection(...arrays) {
    return arrays.reduce((a, b) => b.filter(Set.prototype.has.bind(new Set(a))));
}
