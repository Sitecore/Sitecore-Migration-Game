import { useEngageTracker } from 'components/Contexts';
import LandingPage from 'components/ui/LandingPage/LandingPage';
import * as GTag from 'lib/GTag';
import { consoleLogger } from 'utils/consoleLogger';

const App = () => {
  const tracker = useEngageTracker();

  tracker.TrackPageView({ page: '/', channel: 'WEB', language: 'EN', currency: 'USD' }).catch((err) => {
    consoleLogger('TrackPageView Err', err);
  });

  GTag.pageView('/');

  return <LandingPage />;
};

export default App;
