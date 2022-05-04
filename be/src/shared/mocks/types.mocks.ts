export type MockType<T> = {
  [P in keyof T]: jest.Mock;
};

type ArgsType<T> = T extends (...args: infer A) => unknown ? A : never;

export type TypedMockType<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]: T[P] extends (...args: any) => unknown
    ? jest.Mock<ReturnType<T[P]>, ArgsType<T[P]>>
    : never;
};
