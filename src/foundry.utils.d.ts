/**
 * Recursively sets keys of an object to optional. Used primarily for update methods
 * @internal
 */
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make all properties in T optional and explicitly allow `undefined`
 */
type InexactPartial<T> = {
	[P in keyof T]?: T[P] | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConstructorOf<T> = new (...args: any) => T;
