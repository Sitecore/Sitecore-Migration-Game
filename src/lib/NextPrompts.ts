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
    promptIds.push(...(await getNextPromptsFromCurrentPromptNextPrompts(currentPrompt)));

    const nextPrompts: IPrompt[] | undefined = await hydrateAndFilterOutNextPrompts(
      promptIds,
      allThemePrompts,
      questionsBank,
      answersBank
    );

    return nextPrompts;
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

export const getNextPromptsFromCurrentPromptNextPrompts = async (currentPrompt: IPrompt): Promise<string[]> => {
  let promptIds: string[] = [];

  if (currentPrompt.nextPrompts?.results !== undefined && currentPrompt.nextPrompts.results.length > 0) {
    promptIds = currentPrompt.nextPrompts.results.map((p) => p.id);
  }

  return promptIds;
};

const hydrateAndFilterOutNextPrompts = async (
  promptIds: string[] | undefined,
  allThemePrompts: IPrompt[],
  questionsBank: IPrompt[],
  answersBank: IAnswer[]
): Promise<IPrompt[] | undefined> => {
  let nextValidatedPrompts: IPrompt[] | undefined = [];

  if (promptIds && promptIds.length > 0) {
    // Get all prompts from prompt ids
    nextValidatedPrompts = allThemePrompts.filter((p) => promptIds.includes(p.id) && p.disabled != true);

    // Filter out prompts that are already answered
    nextValidatedPrompts = nextValidatedPrompts?.filter((p) => {
      let promptAnswer: IAnswer | undefined = answersBank.find((a) => a.promptId === p.id);

      if (promptAnswer === undefined) {
        return true;
      } else {
        return false;
      }
    });

    // Filter out prompts that are already in the questions bank
    nextValidatedPrompts = nextValidatedPrompts?.filter((p) => {
      let promptQuestion: IPrompt | undefined = questionsBank.find((q) => q.id === p.id);

      if (promptQuestion === undefined) {
        return true;
      } else {
        return false;
      }
    });

    if (nextValidatedPrompts != undefined && nextValidatedPrompts.length > 0) {
      return [...questionsBank, ...nextValidatedPrompts];
    }
  }

  return questionsBank;
};
