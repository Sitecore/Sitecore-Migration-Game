import { AvatarGallery } from './AvatarGallery';

describe('<AvatarGallery />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AvatarGallery />);
  });
});
