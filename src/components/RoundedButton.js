import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export const RoundedButton = ({
  
  
  setStarted,
  setStop,
  style = {},
  textStyle = {},
  size = 125,
  ...otherProps
}) => {

  
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={otherProps.onPress}
      >
      <Text style={[styles(size).text, textStyle]}>{otherProps.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: '#fff',
      borderWidth: 2,
    },
    text: {
      color: '#fff',
      fontSize: size / 3,
      paddingTop: size/4,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center'
    },
  });
