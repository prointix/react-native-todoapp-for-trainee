import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Todo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
  },
});

export default Todo;
