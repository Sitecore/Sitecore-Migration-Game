import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { OutcomePanel, OutcomeUnavailable } from 'components/Outcomes';
import { Layout, SingleColumnLayout } from 'components/ui';
import * as GTag from 'lib/GTag';
import { MediaService } from 'lib/MediaService';
import { IAnswer, IImage } from 'models';
import { OutcomeConditions, TargetProduct } from 'models/OutcomeConditions';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { AzureTableService } from 'services/AzureTable/AzureTableService';

interface OutcomeHashPageProps {
  answers: IAnswer[];
  persona: string;
  avatar: IImage | undefined;
  theme: string;
  error?: boolean;
}

// Don't pre-render pages at build time.
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

// Generate Pages when requested
export const getStaticProps: GetStaticProps = async (context) => {
  const rowKey = context.params?.rowKey as string;

  if (rowKey === 'error') {
    return { props: { error: true } };
  }

  if (rowKey) {
    const azureTableService = new AzureTableService();

    const payload = await azureTableService.getByRowKey(rowKey);

    if (payload) {
      const jsonPayload = JSON.parse(payload.json);

      if (jsonPayload) {
        const avatarMedia = await MediaService().GetMediaById(jsonPayload.avatarId);

        return {
          props: {
            answers: jsonPayload.answers,
            persona: jsonPayload.personaId,
            avatar: avatarMedia ?? '',
            error: false,
          },
        };
      }
    }
  }

  return {
    props: { error: true },
  };
};

const OutcomeHashPage: FC<OutcomeHashPageProps> = (props) => {
  const router = useRouter();
  const gameInfoContext = useGameInfoContext();
  const tracker = useEngageTracker();

  useEffect(() => {
    // This will track all outcome pages
    // props can be empty on first render, but updates later, this prevents two tracking events from firing
    if (props.error || props.answers) {
      tracker.TrackPageView(
        { page: router.asPath, channel: 'WEB', language: 'EN', currency: 'USD' },
        {
          answers: JSON.stringify(props.answers),
          error: props.error,
        }
      );
    }

    if (props.avatar) {
      gameInfoContext.updateAvatar(props.avatar);
    }

    if (props.persona) {
      gameInfoContext.updatePersona(props.persona);
    }

    if (props.answers) {
      if (!gameInfoContext.answers || gameInfoContext.answers.length === 0) {
        // If answers already exist, don't update them (Means this is someone completing the quiz vs a page view)
        gameInfoContext.updateAnswers(props.answers);
      }

      GTag.event('outcome_answers', 'Answers', JSON.stringify(props.answers));
    }
  }, [props]);

  useEffect(() => {
    // Since Answers is async in nature because they will get updated from the useEffect based on props, we will wait to log event until gameInfoContext.answers is updated
    // Could refactor outcomeconditions though in the future, since it doesn't need gameInfoContext, it just needs answers, which you could pass to it.
    if (gameInfoContext.answers && gameInfoContext.answers.length > 0) {
      let outcomeConditions = new OutcomeConditions(gameInfoContext);
      const requiredProducts: TargetProduct[] = outcomeConditions.requiredProducts();

      if (requiredProducts) {
        requiredProducts.forEach((product) => {
          tracker.TrackEvent('outcome_required_product', { requiredProduct: product });
          GTag.event('outcome_required_product', product, product);
        });
      }
    }
  }, [gameInfoContext.answers]);

  if (props.error) { 
    return (
      <Layout>
        <SingleColumnLayout
          showProgressBar={false}
          showSaveButton={false}
          showResetButton={true}
          showFeedbackButton={true}
        >
          <OutcomeUnavailable />
        </SingleColumnLayout>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <OutcomePanel showProgressBar={false} showSaveButton={false} showFeedbackButton={false} />
      </Layout>
    </>
  );
};

export default OutcomeHashPage;
