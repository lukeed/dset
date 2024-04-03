/**
 * Dynamically sets a value within an object at a specified path, creating nested structures as necessary.
 *
 * This function allows for setting deeply nested values within an object by specifying a path to the target
 * location. The path can be a dot-separated string (e.g., `user.address.street`) or an array of strings/numbers
 * indicating the keys/indexes to traverse. Intermediate objects or arrays are created as needed based on the path.
 *
 * Security measures are in place to prevent prototype pollution; if the path includes `__proto__`, `constructor`,
 * or `prototype`, the function will halt without making any changes.
 *
 * Unlike a deep merge operation, `dset` directly sets the value at the target path, overwriting any existing value.
 *
 * @param obj - The target object to modify.
 * @param keys - The path to the target location within `obj`. Can be a dot-separated string or an array of string/number segments.
 * @param val - The value to set at the target location specified by `keys`.
 *
 * @example
 * // Using string path:
 * const userProfile = {};
 * dset(userProfile, 'name.first', 'Alice');
 * // userProfile => { name: { first: 'Alice' } }
 *
 * @example
 * // Using array path:
 * const userScores = {};
 * dset(userScores, ['scores', 'math'], 95);
 * // userScores => { scores: { math: 95 } }
 *
 * @example
 * // Attempting to set a value using a prohibited key:
 * const secureObj = {};
 * dset(secureObj, 'constructor.prototype.bad', 'Oops');
 * // secureObj => {} (operation halted for security)
 *
 * @example
 * // Overwriting existing values:
 * const userData = { contact: { email: 'alice@example.com' } };
 * dset(userData, 'contact.phone', '123-456-7890');
 * // userData => { contact: { email: 'alice@example.com', phone: '123-456-7890' } }
 */
export function dset<T extends object, V>(obj: T, keys: string | ArrayLike<string | number>, val: V): void;
