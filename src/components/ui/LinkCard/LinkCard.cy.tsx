import { LinkCard } from './LinkCard';

describe('<LinkCard />', () => {
  it('renders', () => {
    cy.mount(<LinkCard link="http://www.google.com" title="google" />);
  });
});
