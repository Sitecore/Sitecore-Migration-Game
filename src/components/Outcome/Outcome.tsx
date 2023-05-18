import { Box, Loader, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RichTextOutput } from 'components/RichTextOutput/RichTextOutput';
import { Loading } from 'components/ui/Loading/Loading';
import { OutcomeService } from 'lib/OutcomeService';
import { IAnswer, IOutcome, IResult } from 'models/Definitions';
import { FC, useEffect, useState } from 'react';

interface OutcomeProps {
  answers: IAnswer[];
}

export const Outcome: FC<OutcomeProps> = ({ answers }) => {
  const outcomeService = OutcomeService();
  const [outcomes, setOutcomes] = useState<IResult<IOutcome[]> | null>(null);
  const [loading, setLoading] = useDisclosure(true);
  const answerOptionIds = answers.map((a) => a.value).flat();

  useEffect(() => {
    const fetchOutcomes = async () => {
      let data = await outcomeService.GetOutcomeByOptionFilter(answerOptionIds);

      setOutcomes(data);
      setLoading.close();
    };

    fetchOutcomes().catch((e) => console.error(e));

    // eslint-disable-next-line
  }, [answers]);

  return (
    <>
      {loading ? (
        <Box style={{ margin: 'auto' }}>
          <Loading message="Loading Outcomes..." />
        </Box>
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
    </>
  );
};
