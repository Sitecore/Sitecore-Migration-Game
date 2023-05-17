import { IAnswer } from 'models/Definitions';
import { FC } from 'react';

interface OutcomeProps {
  answers: IAnswer[];
}

export const Outcome: FC<OutcomeProps> = ({ answers }) => {
  return <div className="outcome"></div>;
};
