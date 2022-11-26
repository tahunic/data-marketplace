import React, { FC } from 'react';
import { Box, Flex, Text } from 'theme-ui';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { theme } from '@styles/theme';
import { FieldLabel } from '@components/atoms/FieldLabel';
import { Pill } from '@components/atoms/Pill';

type DatasetCardProps = {
  title: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  description: string;
  pricePerRecord: number;
  availableRecords?: number;
  countries: string[];
}

export const DatasetCard: FC<DatasetCardProps> = ({
  title,
  thumbnailSrc,
  thumbnailAlt,
  description,
  pricePerRecord,
  availableRecords,
  countries,
}) => {
  let { t } = useTranslation();
  return (
    <Box
      p={24}
      backgroundColor={theme.colors?.cardBackground}
      sx={{ maxWidth: '400px' }}
    >
      <Flex
        sx={{
          gap: '40px',
          alignItems: 'center'
        }}
      >
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          height={80}
          width={80}
        />
        <Text as="h2">{title}</Text>
      </Flex>
      <Flex
        pt={'5px'}
        sx={{ flexDirection: 'column', gap: '5px' }}
      >
        <FieldLabel>{t('dataset_description', 'Dataset Description')}</FieldLabel>
        <Text>{description}</Text>
      </Flex>
      <Flex
        py={'5px'}
        sx={{ justifyContent: 'space-between' }}
      >
        <FieldLabel>{t('cost_per_record', 'Cost Per Record')}</FieldLabel>
        <Text>${pricePerRecord}</Text>
      </Flex>
      <Flex
        py={'5px'}
        sx={{ justifyContent: 'space-between' }}
      >
        <FieldLabel>{t('available_records', 'Available Records')}</FieldLabel>
        <Text>{availableRecords} {t('records', 'records')}</Text>
      </Flex>
      <Flex sx={{ flexDirection: 'column', gap: '5px' }}>
        <FieldLabel>{t('included_countries', 'Included countries')}</FieldLabel>
        <Flex
          py={'5px'}
          sx={{ gap: '10px', flexWrap: 'wrap' }}
        >
          {countries.map((country: string) => <Pill key={country} title={country} />)}
        </Flex>
      </Flex>
    </Box>
  );
};
