export type Either<L, R> = Left<L> | Right<R>;

export class Left<L> {
  readonly _tag: "Left" = "Left";
  constructor(readonly value: L) {}

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }
}

export class Right<R> {
  readonly _tag: "Right" = "Right";
  constructor(readonly value: R) {}

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }
}

export const left = <L>(value: L): Either<L, never> => new Left(value);
export const right = <R>(value: R): Either<never, R> => new Right(value);
export const fold =
  <L, R, A>(onLeft: (l: L) => A, onRight: (r: R) => A) =>
  (e: Either<L, R>): A => {
    if (e.isLeft()) {
      return onLeft(e.value);
    } else {
      return onRight(e.value);
    }
  };
