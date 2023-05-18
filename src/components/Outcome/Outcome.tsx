import { RichTextOutput } from 'components/RichTextOutput/RichTextOutput';
import { OutcomeService } from 'lib/OutcomeService';
import { IAnswer, IOutcome, IResult } from 'models/Definitions';
import { FC, useEffect, useState } from 'react';

interface OutcomeProps {
  answers: IAnswer[];
}

export const Outcome: FC<OutcomeProps> = ({ answers }) => {
  const outcomeService = OutcomeService();
  const [outcomes, setOutcomes] = useState<IResult<IOutcome[]> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const answerOptionIds = answers.map((a) => a.value).flat();

  useEffect(() => {
    const fetchOutcomes = async () => {
      let data = await outcomeService.GetOutcomeByOptionFilter(answerOptionIds);

      setOutcomes(data);
    };

    console.log(answerOptionIds);

    fetchOutcomes().catch((e) => console.error(e));

    setLoading(false);

    // eslint-disable-next-line
  }, [answers]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {outcomes != null && outcomes.results != null && outcomes.results.length > 0 && (
            <>
              {outcomes.results.map((o: IOutcome) => (
                <div key={o.id}>
                  <RichTextOutput content={o.text} />
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};
