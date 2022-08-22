import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Header = ({tab, onTodoPress, onDonePress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onTodoPress}>
        <Text
          style={tab === 'TODOs' ? styles.focusedText : styles.unFocusedText}>
          TODO
        </Text>
      </TouchableOpacity>
      <Text style={styles.bigText}>|</Text>
      <TouchableOpacity onPress={onDonePress}>
        <Text
          style={tab === 'DONE' ? styles.focusedText : styles.unFocusedText}>
          DONE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#9395D3',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  focusedText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 30,
    color: '#fff',
  },
  unFocusedText: {
    fontSize: 30,
    color: '#fff',
  },
});
