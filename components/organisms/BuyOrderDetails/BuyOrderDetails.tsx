import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import { theme } from '@styles/theme';
import { Button, FieldLabel, Flex } from '@components/atoms';
import { CountryControl, EditableText } from '@components/molecules';
import { DatasetMiniCardList } from '@components/organisms';
import { DatasetSelectable } from '@data/models';
import { CountrySelectable } from '@store/countries';
import { getAvailableRecords, getForecastedRecordCount } from '@services';
import toast from 'react-hot-toast';

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
  const initialState = { id, datasets, countries };
  const { t } = useTranslation();

  const [editMode, setEditMode] = useState(!id);
  const [form, setForm] = useState(initialState);

  const nameRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);

  function isValid() {
    const name = nameRef?.current?.value as string;
    const budget = Number(budgetRef?.current?.value);
    const { datasets: formDatasets, countries: formCountries } = form;
    return name?.length > 1 &&
      budget > 0 &&
      formDatasets?.filter(dataset => dataset.selected)?.length > 0 &&
      formCountries?.filter(country => country.selected)?.length > 0;
  }

  function prepareSubmit() {
    if (isValid() && onSubmit) {
      onSubmit({
        ...form,
        name: nameRef?.current?.value,
        budget: Number(budgetRef?.current?.value),
      })
    } else {
      toast.error(t('one_or_more_validation_errors', 'One or more validation errors'));
    }
  }

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
          ref={nameRef}
        />
        <EditableText
          label={t('date_created', 'Date Created')}
          editMode={editMode}
          defaultValue={format(new Date(dateCreated), 'MM/dd/yyyy')}
          readonly={editMode}
        />
      </Flex>

      <Flex gap="15px">
        <EditableText
          type="number"
          label={t('order_budget', 'Order budget')}
          editMode={editMode}
          defaultValue={budget}
          ref={budgetRef}
        />
        <EditableText
          label={t('forecasted_record_count', 'Forecasted record count')}
          editMode={editMode}
          defaultValue={getForecastedRecordCount(form.datasets, form.countries)}
          readonly={editMode}
        />
      </Flex>

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
            <Button onClick={() => {
              setEditMode(false);
              setForm(initialState);
            }}
            >
              {t('cancel', 'Cancel')}
            </Button>
            <Button onClick={() => prepareSubmit()}>
              {t('save', 'Save')}
            </Button>
          </> :
          <>
            <Button onClick={() => setEditMode(true)}>
              {t('edit_order', 'Edit order')}
            </Button>
            {onDelete &&
              <Button onClick={() => {
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
