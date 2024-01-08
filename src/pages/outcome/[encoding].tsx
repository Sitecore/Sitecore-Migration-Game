import { useGameInfoContext } from 'components/Contexts';
import { OutcomePanel } from 'components/Outcomes';
import { Layout } from 'components/ui';
import { IAnswer, IImage } from 'models';
import { GetServerSideProps } from 'next';
import { FC, useEffect } from 'react';

interface OutcomeHashPageProps {
  answers: IAnswer[];
  persona: string;
  avatar: IImage;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const encoding = context.params?.encoding as string;

  if (encoding) {
    const decodedString = decodeURIComponent(encoding);
    const jsonString = Buffer.from(decodedString, 'base64').toString();

    const payload = JSON.parse(jsonString);

    // TODO: Parse Avatar Id to IImage

    return {
      props: { answers: payload.answers, persona: payload.personaId, avatar: payload.avatarId },
    };
  }

  return {
    props: { answers: [], persona: '', avatar: '' },
  };
};

const OutcomeHashPage: FC<OutcomeHashPageProps> = (props) => {
  const gameInfo = useGameInfoContext();

  useEffect(() => {
    gameInfo.updateAnswers(props.answers);
    gameInfo.updatePersona(props.persona);

    console.log('re-render');
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
