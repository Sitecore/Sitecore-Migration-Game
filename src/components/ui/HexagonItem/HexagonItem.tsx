import { Box, Image, chakra } from '@chakra-ui/react';
import { FC } from 'react';

interface HexagonItemProps {
  productName: string;
  icon: string;
  cloud: 'Commerce' | 'Content' | 'Engagement';
  active?: boolean;
}

export const HexagonItem: FC<HexagonItemProps> = ({ productName, icon, cloud, active = true }) => {
  console.log(cloud);
  return (
    <chakra.div
      sx={{
        opacity: active ? 1 : 0.25,
        webkitFilter:
          'url(/images/hex-item-round-corners.svg#helix-round-borders) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6))',
        filter: 'url(/images/hex-item-round-corners.svg#helix-round-borders) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6))',
        paddingBottom: '10px',
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          backgroundImage: 'radial-gradient(75% 80% at center, #878585, #878585, #585858 100%)',
          backgroundColor: '#878585',
          boxShadow: 'inset 0 3px 3px 0 #8d8d8d, inset 0 -3px 3px 0 #898989',
          ...(cloud.toUpperCase() == 'Engagement'.toUpperCase() && {
            backgroundImage: 'radial-gradient(75% 80% at center, #eb1f1f, #eb1f1f, #970d0d 100%)',
            boxShadow: 'inset 0 3px 3px 0 #e33131, inset 0 -3px 3px 0 #e33131',
            backgroundColor: '#eb1f1f',
          }),
          ...(cloud.toUpperCase() == 'Content'.toUpperCase() && {
            backgroundImage: 'radial-gradient(75% 80% at center, #5548d9, #5548d9, #3b2ca9 100%)',
            boxShadow: 'inset 0 3px 3px 0 #625ad5, inset 0 -3px 3px 0 #625ad5',
            backgroundColor: '#5548d9',
          }),
          ...(cloud.toUpperCase() == 'Commerce'.toUpperCase() && {
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
        //className="hex-grid__content"
      >
        <Image
          className="hex-grid__content__icon"
          sx={{
            width: 'auto',
            height: '24px',
            margin: '.75rem 0 .25rem 0',
            webkitFilter: 'brightness(0) invert(1) opacity(0.9)',
            filter: 'brightness(0) invert(1) opacity(0.9)',
          }}
          src={`https://sitecorecontenthub.stylelabs.cloud/api/public/content/${icon}`}
          alt={productName}
          width={30}
          height={30}
        />

        <chakra.h3
          className="hex-grid__content__title"
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
          {productName}
        </chakra.h3>
      </Box>
    </chakra.div>
  );
};
