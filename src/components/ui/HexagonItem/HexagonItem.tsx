import { Box, Image, Popover, PopoverTrigger, Show, chakra } from '@chakra-ui/react';
import { Products, TargetProduct } from 'models/OutcomeConditions';
import { FC } from 'react';

interface HexagonItemProps {
  product: TargetProduct;
  active?: boolean;
}

export const HexagonItem: FC<HexagonItemProps> = ({ product, active = false }) => {
  const productDetail = Products.find((p) => p.product === product);

  if (!productDetail) {
    return null;
  }

  return (
    <Popover closeOnBlur={true}>
      <PopoverTrigger>
        <chakra.div
          sx={{
            opacity: active ? 1 : 0.25,
            webkitFilter:
              'url(/images/hex-item-round-corners.svg#helix-round-borders) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6))',
            filter:
              'url(/images/hex-item-round-corners.svg#helix-round-borders) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6))',
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}
          minH={{ base: '40px', lg: '100px' }}
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
            <Image
              className="hex-grid__content__icon"
              sx={{
                webkitFilter: 'brightness(0) invert(1) opacity(0.9)',
                filter: 'brightness(0) invert(1) opacity(0.9)',
              }}
              src={`https://sitecorecontenthub.stylelabs.cloud/api/public/content/${productDetail.icon}`}
              alt={productDetail.name}
              width="auto"
              height={{ base: '16px', lg: '24px' }}
              margin={{ base: '.25rem 0 .25rem 0', lg: '.75rem 0 .25rem 0' }}
            />

            <Show above="991px">
              <chakra.h3
                sx={{
                  margin: '0 10px 10px 10px',
                  padding: '0 !important',
                  color: '#fff !important',
                  fontSize: '10px',
                  fontWeight: '500',
                  lineHeight: '1.4',
                  maxWidth: '65%',
                  webkitHyphens: 'auto',
                  msHyphens: 'auto',
                  hyphens: 'auto',
                  wordBreak: 'break-word',
                }}
              >
                {productDetail.name}
              </chakra.h3>
            </Show>
          </Box>
        </chakra.div>
      </PopoverTrigger>
    </Popover>
  );
};
