import {
  Badge,
  Box,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { mdiCircleHalfFull } from '@mdi/js';
import Link from 'next/link';

export default function LandingPageHeader() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box layerStyle="section.topbar" shadow={'base'}>
      <Flex h="14" align={'center'} justify="space-between">
        <HStack flexShrink={0}>
          <Link href="/">
            <Image
              p="1"
              h="8"
              w={[8, 8, 'auto']}
              fit="cover"
              align="left"
              alt={'Sitecore Migration Advisor'}
              src={useColorModeValue(
                `https://sitecorecontenthub.stylelabs.cloud/api/public/content/01f247553f4b46498938733e41cb6ae4`,
                `https://sitecorecontenthub.stylelabs.cloud/api/public/content/e88a7e8526914d60a7ac09162207c4e5`
              )}
            />
          </Link>
          <Badge colorScheme="primary" variant="outline">
            Migration Advisor
          </Badge>
        </HStack>
        <Stack direction={'row'} w="full" alignItems={'center'} px={4}></Stack>
        <ButtonGroup size="sm" variant="ghost">
          <Tooltip label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton
              onClick={toggleColorMode}
              icon={
                <Icon>
                  <path d={mdiCircleHalfFull} />
                </Icon>
              }
              aria-label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
