import { Button, Center  } from '@chakra-ui/react';
import { IImage, IPersona } from 'models';
import { FC, useState } from 'react';
import { PersonaList } from './PersonaList/PersonaList';
import { AvatarGallery } from './AvatarGallery/AvatarGallery';
import router from 'next/router';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import * as GTag from 'lib/GTag';

interface ChooseCharacterProps {
  avatars: IImage[] | undefined;
  personas: IPersona[] | undefined;
}

export const ChooseCharacter: FC<ChooseCharacterProps> = ({ avatars, personas }) => {
  const gameInfoContext = useGameInfoContext();
  const tracker = useEngageTracker();

  const [chosenPersona, setPersona] = useState<string>();
  const [chosenAvatar, setAvatar] = useState<IImage>();

  
  const handlePersonaChange = async (newPersona: string) => {
    await tracker.TrackEvent('PERSONA_CHANGE', { persona: newPersona });
    GTag.event('persona_change', 'Persona', newPersona);

    setPersona(newPersona);
  };
  
  const handleAvatarChange = async (newAvatar: IImage) => {
    await tracker.TrackEvent('AVATAR_CHANGE', { avatar: newAvatar.id });
    GTag.event('avatar_change', 'Avatar', newAvatar.id);

    setAvatar(newAvatar);
  };

  const handleStartGame = async () => {
    await gameInfoContext.updatePersona(chosenPersona as string);
    await gameInfoContext.updateAvatar(chosenAvatar as IImage);

    router.push('/prompt');
  };

  console.log("Personas", personas)
  console.log("Avatars", avatars)
  
  return (
    <>
      <PersonaList
        personas={personas}
        toggledButtonId={chosenPersona}
        handlePersonaChange={handlePersonaChange}
        classStyles={null}
      />
      <AvatarGallery
        avatars={avatars}
        toggledAvatarId={chosenAvatar?.id}
        handleAvatarChange={handleAvatarChange}
      />
      <Center>
        <Button
          id='start-game-button'
          margin={10}
          variant={'solid'}
          size={'lg'}
          isDisabled={chosenAvatar == undefined || chosenPersona == undefined}
          onClick={() => handleStartGame()}
        >
          {gameInfoContext.theme?.startButtonText ?? 'Save Changes and Start Adventure'}
        </Button>
      </Center>
    </>
  );
};
