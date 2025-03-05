import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type InputProps = {
  value: string;
  onChange: (text: string) => void;
};
export const Input = ({ value, onChange }: InputProps) => {
  return (
    <TextInput
      style={styles.input}
      onChange={event => onChange(event.nativeEvent.text)}>
      {value}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
