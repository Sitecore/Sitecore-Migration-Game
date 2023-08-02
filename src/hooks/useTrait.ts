import { useState } from 'react';

export interface ITrait<T> {
  get: () => T;
  set: (value: T) => T;
}

export const useTrait = <T>(initialValue?: T) => {
  const [trait, updateTrait] = useState<T>(initialValue ?? ({} as T));

  let current = trait;

  const get = () => current;

  const set = (value: T) => {
    current = value;
    updateTrait(value);
    return current;
  };

  return { get, set };
};
