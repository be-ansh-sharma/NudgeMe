import dayjs from 'dayjs';
import React, { useState } from 'react';

import DatePicker from 'react-native-date-picker';
import { Button } from 'react-native-paper';

export const TimePicker = ({ time, timeHandler }) => {
  const [date, setDate] = useState(time);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)}>
        {dayjs(date).format('hh mm A')}
      </Button>
      <DatePicker
        modal
        mode="time"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          timeHandler(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
