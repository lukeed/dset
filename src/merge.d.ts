type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type DeepMerge<T, U> =
	[T, U] extends [Primitive, Primitive] ? U :
	T extends Primitive ? U :
	U extends Primitive ? U :
	T extends Array<unknown> ? U :
	U extends Array<unknown> ? U :
	{ [K in keyof T | keyof U]: K extends keyof U ? DeepMerge<T[K], U[K]> : K extends keyof T ? T[K] : never };

export function merge<T extends object, U extends object>(a: T, b: U): DeepMerge<T, U>;
export function dset<T extends object, V>(obj: T, keys: string | ArrayLike<string | number>, value: V): void;
