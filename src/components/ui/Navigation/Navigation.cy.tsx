import { GameInfoProvider } from '../../Contexts/GameInfoContext/GameInfoContext';
import { Navigation } from './Navigation';

describe('<Navigation />', () => {
  it('renders', () => {
    cy.mount(
      <GameInfoProvider>
        <Navigation />
      </GameInfoProvider>
    );
  });
});
