import { useState } from 'react';
import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';

export const handleValueChange = (name, setFieldValue) => (val) => setFieldValue(name, val.value);

const CurrencyInput = ({ ...props }) => {
  const [displayValue, setDisplayValue] = useState();
  return (
    <NumberFormat
      customInput={TextField}
      variant={props.variant || 'outlined'}
      isNumericString={true}
      thousandSeparator={true}
      value={displayValue}
      onValueChange={(vals) => setDisplayValue({ value: vals.formattedValue })}
      {...props}
    />
  );
};

export default CurrencyInput;
