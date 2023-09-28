import { IImage } from 'models';
import { AvatarGallery } from './AvatarGallery';

describe('<AvatarGallery />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <AvatarGallery
        avatars={undefined}
        toggledAvatarId={undefined}
        handleAvatarChange={function (avatar: IImage): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  });
});
