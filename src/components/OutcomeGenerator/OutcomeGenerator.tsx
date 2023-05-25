import { ConditionalResponse } from 'components/ConditionalResponse/ConditionalResponse';
import { GameInfoContext, GameInfoContextType } from 'components/GameInfoContext/GameInfoContext';
import { IAnswer, PromptMappings } from 'models';
import Link from 'next/link';
import { FC, useContext } from 'react';

interface OutcomeGeneratorProps {}

export const OutcomeGenerator: FC<OutcomeGeneratorProps> = () => {
  const gameInfoContext = useContext<GameInfoContextType>(GameInfoContext);

  return (
    <>
      <ConditionalResponse
        condition={
          gameInfoContext.answers?.find(
            (x: IAnswer) => x.promptId == PromptMappings.platform && x.value.includes('xm')
          ) != undefined
        }
      >
        <Link href="https://developers.sitecore.com/">User chose XM as their platform</Link>
      </ConditionalResponse>
      This text will always be displayed.
      <ConditionalResponse
        condition={
          gameInfoContext.answers?.find(
            (x: IAnswer) => x.promptId == PromptMappings.platform && x.value.includes('xp')
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
