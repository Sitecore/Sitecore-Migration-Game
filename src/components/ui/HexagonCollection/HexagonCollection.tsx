import { Card, CardBody, CardHeader, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { OutcomeConditions, TargetProduct } from 'models/OutcomeConditions';
import { FC, useCallback, useEffect, useState } from 'react';
import { HexagonItem, Loading } from '..';

interface HexagonCollectionProps {
  classStyles?: any;
}

export const HexagonCollection: FC<HexagonCollectionProps> = ({ classStyles }) => {
  const gameInfoContext = useGameInfoContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [requiredProducts, setRequiredProducts] = useState<TargetProduct[] | undefined>();

  const GetProductsFromAnswers = useCallback(() => {
    let outcomeConditions = new OutcomeConditions(gameInfoContext);

    setRequiredProducts(outcomeConditions.requiredProducts());
  }, [gameInfoContext.answers]);

  useEffect(() => {
    setLoading(true);
    GetProductsFromAnswers();
    setLoading(false);
  }, [GetProductsFromAnswers]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md" variant={'achievements'}>
          <Center>Product Recommendations</Center>
        </Heading>
      </CardHeader>
      <CardBody>
        {loading ? (
          <Loading message="Loading Product Recommendations..." />
        ) : (
          <SimpleGrid
            templateColumns={{ base: '1fr 1fr 1fr 1fr', lg: '1fr 1fr 1fr' }}
            spacing="2px"
            gap={['5px', '10px']}
          >
            <HexagonItem
              product={TargetProduct.xmCloud}
              active={
                requiredProducts != undefined && requiredProducts.find((x) => x == TargetProduct.xmCloud) ? true : false
              }
            />
            <HexagonItem
              product={TargetProduct.search}
              active={
                requiredProducts != undefined && requiredProducts.find((x) => x == TargetProduct.search) ? true : false
              }
            />
            <HexagonItem
              product={TargetProduct.send}
              active={
                requiredProducts != undefined && requiredProducts.find((x) => x == TargetProduct.send) ? true : false
              }
            />
            <HexagonItem
              product={TargetProduct.cdp}
              active={
                requiredProducts != undefined && requiredProducts.find((x) => x == TargetProduct.cdp) ? true : false
              }
            />
            <HexagonItem
              product={TargetProduct.personalize}
              active={
                requiredProducts != undefined && requiredProducts.find((x) => x == TargetProduct.personalize)
                  ? true
                  : false
              }
            />
            <HexagonItem
              product={TargetProduct.orderCloud}
              active={
                requiredProducts != undefined && requiredProducts.find((x) => x == TargetProduct.orderCloud)
                  ? true
                  : false
              }
            />
          </SimpleGrid>
        )}
      </CardBody>
    </Card>
  );
};
