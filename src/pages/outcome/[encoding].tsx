import { useGameInfoContext } from 'components/Contexts';
import { OutcomePanel } from 'components/Outcomes';
import { Layout } from 'components/ui';
import { MediaService } from 'lib/MediaService';
import { IAnswer, IImage } from 'models';
import { GetServerSideProps } from 'next';
import { FC, useEffect } from 'react';

interface OutcomeHashPageProps {
  answers: IAnswer[];
  persona: string;
  avatar: IImage | undefined;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const encoding = context.params?.encoding as string;

  if (encoding) {
    const decodedString = decodeURIComponent(encoding);
    const jsonString = Buffer.from(decodedString, 'base64').toString();

    const payload = JSON.parse(jsonString);

    const avatar: IImage | undefined = await MediaService().GetMediaById(payload.avatarId);

    return {
      props: { answers: payload.answers, persona: payload.personaId, avatar: avatar },
    };
  }

  return {
    props: { answers: [], persona: '', avatar: '' },
  };
};

const OutcomeHashPage: FC<OutcomeHashPageProps> = (props) => {
  const gameInfo = useGameInfoContext();

  useEffect(() => {
    if (props.avatar) {
      gameInfo.updateAvatar(props.avatar);
    }

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
