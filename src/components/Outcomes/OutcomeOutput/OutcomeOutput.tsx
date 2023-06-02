import { RichTextOutput } from 'components/ui';
import { OutcomeService } from 'lib/OutcomeService';
import { IOutcome } from 'models';
import { FC, useEffect, useState } from 'react';

interface OutcomeOutputProps {
  outcomeId: string;
}

export const OutcomeOutput: FC<OutcomeOutputProps> = ({ outcomeId }) => {
  const [outcome, setOutcome] = useState<IOutcome | undefined>();
  useEffect(() => {
    const initialize = async () => {
      let data: IOutcome | null = await OutcomeService().GetOutcomeById(outcomeId);

      if (data != null) {
        setOutcome(data);
      }
    };

    initialize().catch((e) => console.error(e));
  }, []);

  return <>{outcome && outcome.text && <RichTextOutput content={outcome.text} />}</>;
};
