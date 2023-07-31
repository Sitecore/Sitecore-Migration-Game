import AvatarDisplay from './AvatarDisplay';

describe('<AvatarDisplay />', () => {
  it('renders', () => {
    cy.mount(<AvatarDisplay name="Developer" fileUrl="" />);
  });
});
