import { Container } from '@mantine/core';
import { CurrentPrompt } from 'components/Prompts';
import { Navigation } from 'components/ui';
import { PromptService } from 'lib/PromptService';
import { IAnswer, IPrompt } from 'models';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface PromptPageProps {
  prompt: IPrompt | undefined;
}

let promptService = PromptService();

const PromptPage: NextPage<PromptPageProps> = ({ prompt }) => {
  const answerSelected = (answer: IAnswer) => {};

  return (
    <>
      <Container my="sm" size="sm" className="App">
        <Navigation showRestartButton={false} />
        <CurrentPrompt prompt={prompt} answerSelected={answerSelected} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };

  let currentPrompt = await promptService.GetPromptById(id);

  return {
    props: {
      prompt: currentPrompt,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const results: string[] | null = await promptService.GetAllIdPrompts();

  if (results == null) {
    return {
      paths: [],
      fallback: false,
    };
  } else {
    const paths = results.map((id: string) => ({ params: { id: id } }));
    return {
      paths: paths,
      fallback: false,
    };
  }
};

export default PromptPage;
