import { useState } from 'react';

export const useTrait = <T>(initialValue: T) => {
  const [trait, updateTrait] = useState<T>(initialValue);

  let current = trait;

  const get = <T>() => current;

  const set = (value: T) => {
    current = value;
    updateTrait(value);
    return current;
  };

  return { get, set };
};
