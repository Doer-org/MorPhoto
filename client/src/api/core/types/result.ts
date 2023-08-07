export type OK<T> = { type: "ok"; value: T };
export type Error<T> = { type: "error"; error: T };
export type Result<T, U> = OK<T> | Error<U>;
