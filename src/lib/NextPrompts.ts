import { IAnswer, IOption, IPrompt } from 'models';

/** */
export const GetNextPrompts = async (
  currentPrompt: IPrompt | undefined,
  currentPromptAnswer: IAnswer,
  allThemePrompts: IPrompt[],
  questionsBank: IPrompt[],
  answersBank: IAnswer[]
): Promise<IPrompt[] | undefined> => {
  let promptIds: string[] = [];

  // Populate Next Prompt Ids from Prompt Options and Next Prompts
  if (currentPrompt != undefined) {
    promptIds.push(...(await getNextOptionsSelectedPromptIds(currentPrompt, currentPromptAnswer)));

    if (currentPrompt.nextPrompts?.results !== undefined && currentPrompt.nextPrompts.results.length > 0) {
      promptIds.push(...(await getNextPromptsFromCurrentPromptNextPrompts()));
    }

    // Parse Prompts to get back Only Valid Next Prompts
    if (promptIds != undefined && promptIds.length > 0) {
      const nextPromptIds: string[] = allThemePrompts.map((p) => p.id);

      if (nextPromptIds != undefined && nextPromptIds.length > 0) {
        const nextPrompts: IPrompt[] | undefined = await filterOutNextPrompts(
          nextPromptIds,
          questionsBank,
          answersBank
        );

        return nextPrompts;
      }
    }
  }

  return undefined;
};

const getNextOptionsSelectedPromptIds = async (
  currentPrompt: IPrompt,
  currentPromptAnswer: IAnswer
): Promise<string[]> => {
  let promptIds: string[] = [];

  // Get current prompts option prompt ids for only answers
  let optionsSelectedWithNextPrompts: IOption[] | undefined = currentPrompt.options?.results.filter(
    (o) =>
      currentPromptAnswer.value.includes(o.value) &&
      o.nextPrompts?.results !== undefined &&
      o.nextPrompts.results.length > 0
  );

  if (optionsSelectedWithNextPrompts) {
    // Get prompt ids from options
    promptIds = optionsSelectedWithNextPrompts
      .filter((o) => o.nextPrompts?.results !== undefined && o.nextPrompts.results.length > 0)
      .map((o) => {
        return o.nextPrompts!.results.map((p) => p.id);
      })
      .flat();
  }

  return promptIds;
};

export const getNextPromptsFromCurrentPromptNextPrompts = async (): Promise<string[]> => {
  return [];
};

const filterOutNextPrompts = async (
  promptIds: string[],
  questionsBank: IPrompt[],
  answersBank: IAnswer[]
): Promise<IPrompt[] | undefined> => {
  return undefined;
};
