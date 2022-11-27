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
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const DatasetMiniCard: FC<DatasetMiniCardProps> = ({
  title,
  thumbnailSrc,
  thumbnailAlt,
  pricePerRecord,
  selected,
  disabled,
  onClick,
}) => {
  let { t } = useTranslation();

  return (
    <Flex
      p={'10px'}
      sx={{
        gap: '5px',
        background: selected ? theme.colors?.green : theme.colors?.background,
        border: `2px solid ${theme.colors?.text}`,
        width: '49%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.3 : 1,
      }}
      onClick={() => !disabled && onClick()}
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

