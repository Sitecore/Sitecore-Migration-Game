import { Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GameInfoContext, GameInfoContextType } from 'components/GameInfoContext/GameInfoContext';
import { RichTextOutput } from 'components/RichTextOutput/RichTextOutput';
import { Loading } from 'components/ui/Loading/Loading';
import { OutcomeService } from 'lib/OutcomeService';
import { IOutcome, IResult } from 'models';
import { FC, useContext, useEffect, useState } from 'react';

interface OutcomeProps {}

export const Outcome: FC<OutcomeProps> = () => {
  const gameInfoContext = useContext<GameInfoContextType>(GameInfoContext);
  const outcomeService = OutcomeService();
  const [outcomes, setOutcomes] = useState<IOutcome[] | undefined>([]);
  const [loading, setLoading] = useDisclosure(true);
  const answerOptionIds = gameInfoContext.answers?.map((a) => a.value).flat();

  useEffect(() => {
    // const fetchOutcomes = async (answerBank: string[]) => {
    //   let data = await outcomeService.GetOutcomeByOptionFilter(answerBank);
    //   if (data?.results) {
    //     setOutcomes(data?.results.slice().sort((a, b) => (a.sortOrder ?? 100) - (b.sortOrder ?? 100)));
    //   }
    //   setLoading.close();
    // };
    // if (answerOptionIds !== undefined && answerOptionIds.length > 0) {
    //   fetchOutcomes(answerOptionIds).catch((e) => console.error(e));
    // }
    // eslint-disable-next-line
  }, [answerOptionIds]);

  return (
    <>
      {loading ? (
        <Box style={{ margin: 'auto' }}>
          <Loading message="Loading Outcomes..." />
        </Box>
      ) : (
        <>
          {outcomes != null && outcomes.length > 0 && (
            <>
              {outcomes.map((o: IOutcome) => (
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
