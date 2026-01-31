function swapKeysAndValues<A extends PropertyKey, B extends PropertyKey>(obj: Record<A, B>): Record<B, A> {
  const entries = Object.entries(obj) as [A, B][];
  const result = entries.reduce((acc: Record<B, A>, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as Record<B, A>);

  return result;
}
