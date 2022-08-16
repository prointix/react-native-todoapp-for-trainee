import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

const Routes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Todo Routes</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Routes;
