import React, { FC, useState } from 'react';
import { Flex, Text } from 'theme-ui';
import { DatasetSelectable } from '@data/models/Dataset.model';
import { FieldLabel } from '@components/atoms/FieldLabel';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import { theme } from '@styles/theme';
import { Button } from '@components/atoms/Button';
import { DatasetMiniCardList } from '@components/organisms/DatasetMiniCardList';
import { EditableText } from '@components/molecules/EditableText';
import { CountryControl } from '@components/molecules/CountryControl';
import { CountrySelectable } from '@store/countries';
import { getAvailableRecords } from '@services/dataset.service';

type BuyOrderDetailsProps = {
  id?: number;
  orderName: string;
  dateCreated: Date;
  budget?: number;
  datasets: DatasetSelectable[];
  countries: CountrySelectable[];
  onSubmit?: (form) => void;
}

export const BuyOrderDetails: FC<BuyOrderDetailsProps> = ({
  id,
  orderName,
  dateCreated,
  budget,
  datasets,
  countries,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(!id);
  const [form, setForm] = useState({
    id: id,
    name: orderName,
    budget,
    createdAt: dateCreated,
    datasets,
    countries,
  });

  return (
    <Flex
      p={'24px 50px'}
      sx={{
        backgroundColor: theme.colors?.cardBackground,
        gap: '20px',
        flexDirection: 'column',
        marginBottom: '50px',
      }}
    >
      <Flex sx={{ gap: '15px' }}>
        <EditableText
          type="text"
          label={t('order_name', 'Order name')}
          editMode={editMode}
          defaultValue={orderName}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          invalid={form.name?.length === 0}
        />
        <EditableText
          editMode={editMode}
          label={t('date_created', 'Date Created')}
          defaultValue={format(new Date(dateCreated), 'MM/dd/yyyy')}
          readonly
        />
      </Flex>


      <EditableText
        type="number"
        label={t('order_budget', 'Order budget')}
        editMode={editMode}
        defaultValue={budget}
        onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
        invalid={!form.budget}
      />

      <Flex sx={{ gap: '5px', flexDirection: 'column' }}>
        <FieldLabel>{t('included_datasets', 'Included datasets')}</FieldLabel>
        <DatasetMiniCardList
          datasets={form.datasets.filter(dataset => editMode ? true : dataset.selected)}
          onSelect={(dataset) => setForm({
            ...form,
            datasets: form.datasets.map(d => d.id === dataset.id ? { ...d, selected: !d.selected } : d)
          })}
          readonly={!editMode}
        />
      </Flex>

      <Flex sx={{ gap: '5px', flexDirection: 'column' }}>
        <FieldLabel>{t('included_countries', 'Included countries')}</FieldLabel>
        <Flex sx={{ gap: '5px', flexDirection: 'row' }}>
          <CountryControl
            countries={form.countries}
            onSetCountries={(country) => {
              const updatedCountries = form.countries
                .map(c => c.countryCode === country.countryCode ? { ...c, selected: !c.selected } : c);
              setForm({
                ...form,
                countries: updatedCountries,
                datasets: form.datasets.map(d => ({
                  ...d,
                  disabled: getAvailableRecords(d, updatedCountries.filter(c => c.selected)) === 0,
                  selected: d.selected && getAvailableRecords(d, updatedCountries.filter(c => c.selected)) > 0,
                }))
              });
            }}
            readonly={!editMode}
          />
        </Flex>
      </Flex>

      {editMode ?
        <Flex sx={{ justifyContent: 'center' }}>
          <Button type="submit" onClick={() => onSubmit && onSubmit(form)}>
            {t('save', 'Save')}
          </Button>
        </Flex> :
        <Flex sx={{ gap: '5px', justifyContent: 'flex-end' }}>
          <Button type="button" onClick={() => setEditMode(true)}>
            {t('edit_order', 'Edit order')}
          </Button>
          <Button type="button" onClick={() => alert('Delete?')}>
            {t('delete_order', 'Delete order')}
          </Button>
        </Flex>
      }
    </Flex>
  );
};
