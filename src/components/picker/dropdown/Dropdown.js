import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './Dropdown.style';
import { Text } from 'react-native-paper';

const CustomDropdown = ({ label, options, handler }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  const onValueChange = item => {
    setValue(item.value);
    setIsFocus(false);
    handler(label, item.value);
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `${label}` : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => onValueChange(item)}
      />
    </View>
  );
};

export default CustomDropdown;
