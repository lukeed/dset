type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type DeepMerge<T, U> =
	[T, U] extends [Primitive, Primitive] ? U :
	T extends Primitive ? U :
	U extends Primitive ? U :
	T extends Array<unknown> ? U :
	U extends Array<unknown> ? U :
	{ [K in keyof T | keyof U]: K extends keyof U ? DeepMerge<T[K], U[K]> : K extends keyof T ? T[K] : never };

/**
 * Deeply merges objects `a` and `b`, modifying `a` in-place.
 *
 * Note: This function modifies the first object (`a`) directly, incorporating properties from object `b`.
 * For arrays within the objects, elements are merged index-by-index, with extra elements in the first array (`a`) preserved.
 * Primitive values in `b` will overwrite those in `a` where they share the same key.
 *
 * @param a - The target object to be merged into and modified.
 * @param b - The source object, whose properties will be merged into `a`.
 * @returns The modified first object (`a`) after merging.
 *
 * @example
 * // Basic object merging:
 * const objA = { name: 'Alice', contact: { email: 'alice@example.com' } };
 * const objB = { age: 30, contact: { phone: '123-456-7890' } };
 * merge(objA, objB);
 * // objA => { name: 'Alice', age: 30, contact: { email: 'alice@example.com', phone: '123-456-7890' } }
 *
 * @example
 * // Array merging within objects:
 * const objC = { hobbies: ['reading'] };
 * const objD = { hobbies: ['cycling', 'hiking'] };
 * merge(objC, objD);
 * // objC => { hobbies: ['cycling', 'hiking'] }
 *
 * @example
 * // Merging with primitive value overwrite:
 * const objE = { isEnabled: false, details: { flag: true } };
 * const objF = { isEnabled: true, details: { flag: false } };
 * merge(objE, objF);
 * // objE => { isEnabled: true, details: { flag: false } }
 *
 * @example
 * // Deep merging with nested objects:
 * const objG = { user: { name: 'Alice', address: { city: 'Wonderland' } } };
 * const objH = { user: { age: 30, address: { country: 'Fantasy' } } };
 * merge(objG, objH);
 * // objG => { user: { name: 'Alice', age: 30, address: { city: 'Wonderland', country: 'Fantasy' } } }
 *
 * @example
 * // Preserving extra elements in the first array:
 * const objI = { values: [1, 2, 3, 4] };
 * const objJ = { values: [5, 6] };
 * merge(objI, objJ);
 * // objI => { values: [5, 6, 3, 4] }
 */
export function merge<T extends object, U extends object>(a: T, b: U): DeepMerge<T, U>;

/**
 * Sets a value within a nested object structure based on a given path.
 *
 * The path to the target location where the value should be set can be specified
 * as a dot-separated string (e.g., `a.b.c`) or as an array of strings and/or numbers
 * (e.g., `['a', 'b', 'c']`). If intermediate objects or arrays do not exist at any point
 * in the path, they are created. The type of structure created (object or array) depends
 * on the subsequent path segment's type or content.
 *
 * To protect against prototype pollution, the operation is aborted if any segment of the path
 * is `__proto__`, `constructor`, or `prototype`.
 *
 * If a value already exists at the target path, it is deeply merged with the provided value
 * using the `merge` function.
 *
 * @param obj - The target object to set the value in.
 * @param keys - The path to the target location, specified as a dot-separated string
 *               or an array of string and number segments.
 * @param value - The value to set at the target location.
 *
 * @example
 * // Setting a primitive value:
 * const obj1 = {};
 * dset(obj1, 'a.b.c', 123);
 * // obj1 => { a: { b: { c: 123 } } }
 *
 * @example
 * // Setting a value with array notation
 * const obj2 = {};
 * dset(obj2, ['a', 0, 'c'], 'hello');
 * // obj2 => { a: [{ c: 'hello' }] }
 *
 * @example
 * // Deep merging of objects
 * const obj3 = { a: { b: { existing: 456 } } };
 * dset(obj3, 'a.b', { new: 123 });
 * // obj3 => { a: { b: { existing: 456, new: 123 } } }
 */
export function dset<T extends object, V>(obj: T, keys: string | ArrayLike<string | number>, val: V): void;
