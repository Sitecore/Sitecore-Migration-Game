import { useGameInfoContext } from 'components/Contexts';
import { OutcomePanel } from 'components/Outcomes';
import { Layout } from 'components/ui';
import { MediaService } from 'lib/MediaService';
import { IAnswer, IImage } from 'models';
import { GetServerSideProps } from 'next';
import { FC, useEffect } from 'react';
import { AzureTableService } from 'services/AzureTable/AzureTableService';

interface OutcomeHashPageProps {
  answers: IAnswer[];
  persona: string;
  avatar: IImage | undefined;
  theme: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rowKey = context.params?.rowKey as string;

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
    notFound: true,
  };
};

const OutcomeHashPage: FC<OutcomeHashPageProps> = (props) => {
  const gameInfo = useGameInfoContext();

  useEffect(() => {
    if (props.avatar) {
      gameInfo.updateAvatar(props.avatar);
    }

    gameInfo.updateTheme(props.theme);

    gameInfo.updateAnswers(props.answers);
    gameInfo.updatePersona(props.persona);
  }, [props]);

  return (
    <>
      <Layout>
        <OutcomePanel showProgressBar={false} showSaveButton={false} showFeedbackButton={false} />
      </Layout>
    </>
  );
};

export default OutcomeHashPage;
