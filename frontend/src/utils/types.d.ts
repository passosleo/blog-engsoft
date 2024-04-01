export type ObjectRecursiveOf<T> = { [key: string]: ObjectRecursiveOf<T> | T };
