import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as DateInput } from '@mui/x-date-pickers/DatePicker';

// interface DatePickerProps {
//     label: string;
// }

export default function DatePicker({ label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateInput label={label} />
    </LocalizationProvider>
  );
}
