import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {useTodos} from '../../services/todo';

const Todo = ({navigation}) => {
  const {
    todos,
    getAllTodos,
    setIsLoading,
    isLoading,
    updateTodo,
    getMoreTodos,
  } = useTodos(1);
  const [currentPage, setCurrentPage] = useState(2);
  const [tab, setTab] = useState('TODOs'); // todos or done
  const doneTodo = todos.filter(status => status.completed);

  const onDonePressHandler = () => {
    setCurrentPage(2);
    setTab('DONE');
  };

  const onTodoPressHandler = () => {
    setCurrentPage(2);
    setTab('TODOs');
  };

  const onIconClicked = (id, title, subTitle, completed) => {
    updateTodo(id, title, subTitle, completed);
    getAllTodos();
  };

  const onRefresh = () => {
    setIsLoading(true);
    getAllTodos();
    setIsLoading(false);
  };

  const onEndReachedHandler = () => {
    // const page = todos.length / 20 + 1;
    console.log('reach page');
    setCurrentPage(currentPage + 1);
    getMoreTodos(currentPage);
    // setPage(page);
    // useTodos;
  };

  const ListItem = ({todo}) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={styles.bigText}>
            ID: {todo.id} - {todo.title}
          </Text>
          <Text style={styles.smallText}>{todo.subTitle}</Text>
        </View>
        <TouchableOpacity
          style={[styles.actionIcon]}
          onPress={() =>
            onIconClicked(todo.id, todo.title, todo.subTitle, todo.completed)
          }>
          {todo.completed ? (
            <Icon name={'checkbox-active'} solid size={20} color="black" />
          ) : (
            <Icon name={'checkbox-passive'} solid size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const onAddPressHandler = () => {
    navigation.navigate('TodoCreate');
  };

  return (
    <LinearGradient
      colors={['#d1d3ff', '#9A9CCD']}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onTodoPressHandler()}>
          <Text
            style={tab === 'TODOs' ? styles.focusedText : styles.unFocusedText}>
            TODO
          </Text>
        </TouchableOpacity>
        <Text style={styles.bigText}>|</Text>
        <TouchableOpacity onPress={() => onDonePressHandler()}>
          <Text
            style={tab === 'DONE' ? styles.focusedText : styles.unFocusedText}>
            DONE
          </Text>
        </TouchableOpacity>
      </View>
      {
        <View style={styles.body}>
          <FlatList
            data={tab === 'DONE' ? doneTodo : todos}
            renderItem={({item}) => <ListItem todo={item} />}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            onEndReached={onEndReachedHandler}
            onEndReachedThreshold={0}
            ListFooterComponent={() => <ActivityIndicator />}
          />
        </View>
        /* tab === 'DONE' ? (
          <View style={styles.body}>
            <FlatList
              data={doneTodo}
              renderItem={({item}) => <ListItem todo={item} />}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              onEndReached={onEndReachedHandler}
              onEndReachedThreshold={0}
              ListFooterComponent={() => <ActivityIndicator />}
            />
          </View>
        ) : (
          <View style={styles.body}>
            <FlatList
              data={todos}
              renderItem={({item}) => <ListItem todo={item} />}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              onEndReached={onEndReachedHandler}
              onEndReachedThreshold={0}
              ListFooterComponent={() => <ActivityIndicator />}
            />
          </View>
        ) */
      }

      <TouchableOpacity style={styles.button} onPress={onAddPressHandler}>
        <Icon name="plus-a" size={20} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9395D3',
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
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#9395D3',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  body: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#B3B7EE',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
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
  listItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 7,
    marginVertical: 9,
    width: 350,
    elevation: 3,
  },
  indicator: {
    alignItems: 'center',
  },
});

export default Todo;
