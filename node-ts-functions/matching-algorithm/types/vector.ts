/**
 * Generic vector type with predefined length
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export interface Vector<T extends unknown, L extends number> extends Array<T> {
  0: T;
  length: L;
  map: <U>(
    callback: (item: T, index: number, vector: Vector<T, L>) => U
  ) => Vector<U, L>;
}

export const createVector = <T, L extends number>(...array: T[]) => {
  return array as unknown as Vector<T, L>;
};
