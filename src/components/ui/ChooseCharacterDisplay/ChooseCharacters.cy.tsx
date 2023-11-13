import { IImage, IPersona } from 'models';
import { ChooseCharacter } from './ChooseCharacter';

describe('<ChooseCharacter />', () => {
  it('Start game button disabled until both avatar and persona chosen', () => {
    cy.mount(<ChooseCharacter avatars={TestAvatars} personas={TestPersonas} />);
    cy.get('#start-game-button').should('be.disabled');
    cy.get('.css-1izj7gt > :nth-child(1)').click();
    cy.get('#start-game-button').should('be.disabled');
    cy.get(':nth-child(2) > .chakra-button').click();
    cy.get('#start-game-button').should('be.enabled');
  });
});

const TestPersonas: IPersona[] = [
  {
    id: 'BeomIrAEFE2tS6QMqaVSqQ',
    name: 'Business Leader',
    personaImage: {
      results: [
        {
          id: 'J47KgWi5kkmDde_4LwuxUg',
          fileUrl:
            'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/25ee33e6d4e84abd8965a849bffe445b',
          fileName: '',
        },
      ],
    },
    theme: {
      results: [
        {
          id: '-e_W0k2zO0uZPNBmYtorCQ',
          name: 'Corporate Mission',
          chakraTheme: '',
          startButtonText: '',
          description: '',
          disabled: false,
        },
      ],
    },
  },
  {
    id: 'nMeJvakIB0Kvx29f5uVdiw',
    name: 'Developer',
    personaImage: {
      results: [
        {
          id: 'IuUJOHp_CE6r5zgg2ZUFaw',
          fileUrl:
            'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/281912e430c14f9787230b05b7ba9d37',
          fileName: '',
        },
      ],
    },
    theme: {
      results: [
        {
          id: '-e_W0k2zO0uZPNBmYtorCQ',
          name: 'Corporate Mission',
          chakraTheme: '',
          startButtonText: '',
          description: '',
          disabled: false,
        },
      ],
    },
  },
];

const TestAvatars: IImage[] = [
  {
    id: 'XSs2wawr40-kJLd8VknJvg',
    fileUrl:
      'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/d32b9f9a3a9449328919e9e5f4d88a56',
    fileName: '',
  },
  {
    id: 'JbfoSfrvNUqb3XEXlPq0fw',
    fileUrl:
      'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/b50ce35c61e44ca282391a30fb5a7f95',
    fileName: '',
  },
  {
    id: '_iYSesHOOkmNShvkuDqziQ',
    fileUrl:
      'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/7e7915fa1592454a88ef133254467f5a',
    fileName: '',
  },
];
