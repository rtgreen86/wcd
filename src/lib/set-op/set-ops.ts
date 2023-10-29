export const union = <Type>(A: Set<Type>, B: Set<Type>) => new Set<Type>([...A, ...B]);

export const inter = <Type>(A: Set<Type>, B: Set<Type>) => new Set<Type>([...A].filter(x => B.has(x)));

export const diff = <Type>(A: Set<Type>, B: Set<Type>) => new Set<Type>([...A].filter(x => !B.has(x)));

export const symDiff = <Type>(A: Set<Type>, B: Set<Type>) => new Set<Type>(diff(union(A, B), inter(A, B)));
