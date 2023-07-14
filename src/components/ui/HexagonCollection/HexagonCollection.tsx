import { SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import { HexagonItem } from '../HexagonItem/HexagonItem';

interface HexagonCollectionProps {
  classStyles?: any;
}

export const HexagonCollection: FC<HexagonCollectionProps> = ({ classStyles }) => {
  // TODO Get latest Products needed

  return (
    <SimpleGrid columns={3} spacing="2px" gap="10px">
      <HexagonItem productName="XM Cloud" icon="0f7f9565544a42c19371f215bd57cc0d" cloud="Content" active />
      <HexagonItem productName="Content Operations" icon="d23e3e8b102746ed8b0a60758e2bd58c" cloud="Content" />
      <HexagonItem productName="Sitecore Search" icon="7e75e5619d514d3893c4079d291e4776" cloud="Content" active />
      <HexagonItem productName="Sitecore DAM" icon="d4460059f7f74238bb65b760a8fa6859" cloud="Content" />
      <HexagonItem productName="Content Hub ONE" icon="7304d4a7dea04a5db702aaa8ca888117" cloud="Content" />
      <HexagonItem productName="Sitecore Send" icon="e021e8eba3cd42d295458bb7fb064d77" cloud="Engagement" />
      <HexagonItem productName="Sitecore CDP" icon="26469b42c25e4d7f91ef05c811bd601b" cloud="Engagement" />
      <HexagonItem productName="Sitecore Personalize" icon="e7010cd758d049f6ad9577e2824d5bea" cloud="Engagement" />

      <HexagonItem productName="Sitecore Discover" icon="321e52cb1a654d6cbb4b741a36506548" cloud="Commerce" />
      <HexagonItem productName="Sitecore Connect" icon="8ab39b3190204ee796622d8934d19f8b" cloud="Engagement" />
      <HexagonItem productName="Sitecore OrderCloud" icon="3eb03031027e456eb212d7c3ddf1295a" cloud="Commerce" />
    </SimpleGrid>
  );
};
