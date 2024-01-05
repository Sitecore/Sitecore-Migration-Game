import { useGameInfoContext } from 'components/Contexts';
import { OutcomePanel } from 'components/Outcomes';
import { Layout } from 'components/ui';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

interface OutcomeHashPageProps {
  answers: any[];
}

const OutcomeHashPage: FC<OutcomeHashPageProps> = (props) => {
  const gameInfo = useGameInfoContext();

  console.log(props.answers);

  // Update the gameInfoContext with the answers from the query string
  gameInfo.updateAnswers(props.answers);

  return (
    <>
      <Layout>
        <OutcomePanel showProgressBar={false} showSaveButton={false} showFeedbackButton={false} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hash = context.params?.hash as string;

  if (hash) {
    const decodedString = decodeURIComponent(hash);
    const jsonString = Buffer.from(decodedString, 'base64').toString();

    const payload = JSON.parse(jsonString);
    return {
      props: { answers: payload.answers },
    };
  }

  return {
    props: { answers: [] },
  };
};

export default OutcomeHashPage;
