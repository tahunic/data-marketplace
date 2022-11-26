import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Flex, Text } from 'theme-ui';
import Image from 'next/image';
import { theme } from '@styles/theme';

type DatasetMiniCardProps = {
  title: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  pricePerRecord: number;
}

export const DatasetMiniCard: FC<DatasetMiniCardProps> = ({
  title,
  thumbnailSrc,
  thumbnailAlt,
  pricePerRecord,
}) => {
  let { t } = useTranslation();

  return (
    <Flex
      p={'10px'}
      sx={{
        gap: '5px',
        background: theme.colors?.background,
        border: `2px solid ${theme.colors?.text}`,
        width: '49%',
      }}
    >
      <Image
        src={thumbnailSrc}
        alt={thumbnailAlt}
        height={40}
        width={40}
      />
      <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Text as="h5">{title}</Text>
        <Text as="small" sx={{color: theme.colors?.secondaryText}}>
          ${pricePerRecord} {t('per_record', 'Per record')}
        </Text>
      </Flex>
    </Flex>
  );
};

