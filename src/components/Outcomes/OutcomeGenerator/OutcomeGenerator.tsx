import { ConditionalResponse } from 'components/Outcomes';
import { useGameInfoContext } from 'components/ui';
import { IAnswer, PromptMappings } from 'models';
import Link from 'next/link';
import { FC } from 'react';

interface OutcomeGeneratorProps {}

export const OutcomeGenerator: FC<OutcomeGeneratorProps> = () => {
  const gameInfoContext = useGameInfoContext();

  return (
    <>
      <ConditionalResponse
        condition={
          gameInfoContext.answers?.find(
            (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xm')
          ) != undefined
        }
      >
        <Link href="https://developers.sitecore.com/">User chose XM as their platform</Link>
      </ConditionalResponse>
      This text will always be displayed.
      <ConditionalResponse
        condition={
          gameInfoContext.answers?.find(
            (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xp')
          ) != undefined
        }
      >
        <Link href="https://developers.sitecore.com/">User chose XP as their platform</Link>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptId == PromptMappings.existingFramework && x.value.includes('nextjs')
            ) != undefined
          }
        >
          <Link href="https://nextjs.org/">Next.js Docs</Link>
        </ConditionalResponse>
      </ConditionalResponse>
    </>
  );
};
