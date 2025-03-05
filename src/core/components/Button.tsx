import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from 'core/constants';

type ButtonProps = {
  tittle: string;
  onPress: () => void;
};
export const Button = ({ tittle, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>{tittle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  txt: {
    color: COLORS.white,
    fontSize: 24,
    textAlign: 'center',
  },
});
