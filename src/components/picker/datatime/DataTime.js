import dayjs from 'dayjs';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Button } from 'react-native-paper';

export default ({ dateHandler }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <>
      <Button
        mode="elevated"
        title="Open"
        onPress={() => {
          setOpen(true);
        }}>
        {selected
          ? dayjs(date).add(10, 'day').format('DD-MM-YYYY, hh mm')
          : 'Custom'}
      </Button>
      <DatePicker
        modal
        open={open}
        minimumDate={new Date()}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setSelected(true);
          dateHandler(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
