import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

export const ListItem = ({todo, onPress, onItemPress}) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onItemPress}>
      <View style={styles.itemColumn}>
        <Text style={styles.bigText}>
          ID: {todo.id} - {todo.title}
        </Text>
        <Text style={styles.smallText}>{todo.subTitle}</Text>
      </View>
      <TouchableOpacity style={[styles.actionIcon]} onPress={onPress}>
        {todo.completed ? (
          <Icon name={'checkbox-active'} solid size={20} color="black" />
        ) : (
          <Icon name={'checkbox-passive'} solid size={20} color="black" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  listItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 7,
    marginVertical: 9,
    elevation: 3,
    marginHorizontal: 20,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  actionIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 3,
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
});
