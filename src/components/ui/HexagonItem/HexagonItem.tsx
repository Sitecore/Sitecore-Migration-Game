import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Show,
  Text,
  chakra,
} from '@chakra-ui/react';
import { Products } from 'models/Config';
import { TargetProduct } from 'models/OutcomeConditions';
import { FC, useState } from 'react';

interface HexagonItemProps {
  product: TargetProduct;
  active?: boolean;
}

export const HexagonItem: FC<HexagonItemProps> = ({ product, active = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const productDetail = Products.find((p) => p.product === product);

  if (!productDetail) {
    return null;
  }

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button
          variant="unstyled"
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            opacity: active ? 1 : 0.15,
            webkitFilter:
              'url(/images/hex-item-round-corners.svg#helix-round-borders) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6))',
            filter:
              'url(/images/hex-item-round-corners.svg#helix-round-borders) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6))',
            transition: 'opacity 0.3s',
            pointerEvents: active ? 'auto' : 'none',
          }}
          minH={{ base: '40px', lg: '100px' }}
          minW={{ base: '40px', lg: '100px' }}
          paddingBottom="10px"
        >
          <Box
            sx={{
              backgroundImage: 'radial-gradient(75% 80% at center, #878585, #878585, #585858 100%)',
              backgroundColor: '#878585',
              boxShadow: 'inset 0 3px 3px 0 #8d8d8d, inset 0 -3px 3px 0 #898989',
              ...(productDetail.cloud == 'ENGAGEMENT' && {
                backgroundImage: 'radial-gradient(75% 80% at center, #eb1f1f, #eb1f1f, #970d0d 100%)',
                boxShadow: 'inset 0 3px 3px 0 #e33131, inset 0 -3px 3px 0 #e33131',
                backgroundColor: '#eb1f1f',
              }),
              ...(productDetail.cloud == 'CONTENT' && {
                backgroundImage: 'radial-gradient(75% 80% at center, #5548d9, #5548d9, #3b2ca9 100%)',
                boxShadow: 'inset 0 3px 3px 0 #625ad5, inset 0 -3px 3px 0 #625ad5',
                backgroundColor: '#5548d9',
              }),
              ...(productDetail.cloud == 'COMMERCE' && {
                backgroundImage: 'radial-gradient(75% 80% at center, #02a79a, #02a79a, #006c63 100%)',
                boxShadow: 'inset 0 3px 3px 0 #0ba599, inset 0 -3px 3px 0 #0ba599',
                backgroundColor: '#02a79a',
              }),
              boxSizing: 'border-box',
              height: '100%',
              width: '100%',
              fontSize: '1.125rem',
              webkitClipPath: 'polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)',
              clipPath: 'polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0',
              textDecoration: 'none',
              textAlign: 'center',
              transition: 'transform 0.3s ease-out',
            }}
          >
            <Show below="991px">
              <Image
                className="hex-grid__content__icon"
                sx={{
                  webkitFilter: 'brightness(0) invert(1) opacity(0.9)',
                  filter: 'brightness(0) invert(1) opacity(0.9)',
                }}
                src={productDetail.iconSmall}
                alt={productDetail.name}
                width="auto"
                height={{ base: '24px' }}
                margin={{ base: '.25rem 0 0 0' }}
              />
            </Show>
            <Show above="991px">
              <Image
                className="hex-grid__content__icon"
                sx={{
                  webkitFilter: 'brightness(0) invert(1) opacity(0.9)',
                  filter: 'brightness(0) invert(1) opacity(0.9)',
                }}
                src={productDetail.icon}
                alt={productDetail.name}
                width="auto"
                height={{ base: '24px', lg: '48px' }}
                margin={{ base: '.25rem 0 .25rem 0', lg: '.75rem 0 .25rem 0' }}
              />
            </Show>
          </Box>
        </Button>
      </PopoverTrigger>
      <PopoverContent p="4" mx="4">
        <PopoverArrow bg="white" />
        <PopoverCloseButton />
        <PopoverBody>
          <Heading as="h3" size="lg">
            {productDetail.name}
          </Heading>
          <Text fontSize="md" pt="2">
            {productDetail.description}
          </Text>
          <Link href={productDetail.url} isExternal>
            <Button colorScheme="primary" variant="solid" mt="5">
              Learn More
            </Button>
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
