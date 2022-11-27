import React, { FC, useState } from 'react';
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
import { Flex } from '@components/atoms/Flex';

type BuyOrderDetailsProps = {
  id?: number;
  orderName: string;
  dateCreated: Date;
  budget?: number;
  datasets: DatasetSelectable[];
  countries: CountrySelectable[];
  onSubmit?: (form) => void;
  onDelete?: (id) => void;
}

export const BuyOrderDetails: FC<BuyOrderDetailsProps> = ({
  id,
  orderName,
  dateCreated,
  budget,
  datasets,
  countries,
  onSubmit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(!id);
  const initialState = {
    id: id,
    name: orderName,
    budget,
    createdAt: dateCreated,
    datasets,
    countries,
  };
  const [form, setForm] = useState(initialState);

  return (
    <Flex
      p="24px 50px"
      gap="20px"
      flexDirection="column"
      mb="50px"
      sx={{ backgroundColor: theme.colors?.cardBackground }}
    >
      <Flex gap="15px">
        <EditableText
          label={t('order_name', 'Order name')}
          editMode={editMode}
          defaultValue={orderName}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          invalid={form.name?.length === 0}
        />
        <EditableText
          label={t('date_created', 'Date Created')}
          editMode={editMode}
          defaultValue={format(new Date(dateCreated), 'MM/dd/yyyy')}
          readonly={editMode}
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

      <Flex flexDirection="column">
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

      <Flex flexDirection="column">
        <FieldLabel>{t('included_countries', 'Included countries')}</FieldLabel>
        <Flex>
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

      <Flex justifyContent="flex-end">
        {editMode ?
          <>
            <Button type="submit" onClick={() => {
              setEditMode(false);
              setForm(initialState);
            }}>
              {t('cancel', 'Cancel')}
            </Button>
            <Button type="submit" onClick={() => onSubmit && onSubmit(form)}>
              {t('save', 'Save')}
            </Button>
          </> :
          <>
            <Button type="button" onClick={() => setEditMode(true)}>
              {t('edit_order', 'Edit order')}
            </Button>
            {onDelete &&
              <Button type="button" onClick={() => {
                if (confirm(t('delete_order_confirm', 'Are you sure you want to delete this order?') ?? '')) {
                  onDelete(form.id);
                }
              }}
              >
                {t('delete_order', 'Delete order')}
              </Button>
            }
          </>}
      </Flex>
    </Flex>
  );
};
