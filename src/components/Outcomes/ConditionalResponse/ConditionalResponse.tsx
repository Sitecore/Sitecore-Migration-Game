import { FC } from 'react';

interface ConditionalResponseProps {
  condition: boolean;
  children: React.ReactNode;
}

export const ConditionalResponse: FC<ConditionalResponseProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};
