import { useGameInfoContext } from 'components/Contexts';
import { OutcomePanel, OutcomeUnavailable } from 'components/Outcomes';
import { Layout, SingleColumnLayout } from 'components/ui';
import { MediaService } from 'lib/MediaService';
import { IAnswer, IImage } from 'models';
import { GetStaticProps } from 'next';
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
            theme: jsonPayload.themeId,
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
  const gameInfo = useGameInfoContext();

  useEffect(() => {
    if (props.avatar) {
      gameInfo.updateAvatar(props.avatar);
    }

    if (props.theme) {
      gameInfo.updateTheme(props.theme);
    }

    if (props.persona) {
      gameInfo.updatePersona(props.persona);
    }

    if (props.answers) {
      gameInfo.updateAnswers(props.answers);
    }
  }, [props]);

  if (props.error) {
    return (
      <Layout>
        <SingleColumnLayout
          showProgressBar={false}
          showSaveButton={false}
          showResetButton={true}
          showFeedbackButton={true}
          backgroundImage={
            gameInfo.theme?.chakraTheme == 'fantasy'
              ? 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/182bc6d196aa465cbf9b614ff2883eb4'
              : 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/1821f8838e284d6fad1d483d41877aba'
          }
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
