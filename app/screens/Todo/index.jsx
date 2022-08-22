import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {useTodos} from '../../services/todo';
import {ListItem} from './ListItem';
import {Header} from './Header';

const Todo = ({navigation}) => {
  const {
    todos,
    getAllTodos,
    isLoading,
    updateTodo,
    getMoreTodos,
  } = useTodos();
  const [currentPage, setCurrentPage] = useState(2);
  const [tab, setTab] = useState('TODOs'); // todos or done
  const doneTodo = todos.filter(status => status.completed);
  const [refreshing, setRefreshing] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  const onDonePressHandler = () => {
    setTab('DONE');
  };

  const onTodoPressHandler = () => {
    setTab('TODOs');
  };

  const onItemPressHandler = (id, title, subTitle, completed) => {
    navigation.navigate('TodoEdit', {
      itemId: id,
      itemTitle: title,
      itemSubTitle: subTitle,
      itemCompleted: completed,
    });
  };

  const onIconClicked = (id, title, subTitle, completed) => {
    const isCompleted = !completed;
    updateTodo(id, title, subTitle, isCompleted);
    getAllTodos();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(2);
    getAllTodos();
    setRefreshing(false);
  };

  const onEndReachedHandler = () => {
    console.log('reach page');
    setCurrentPage(currentPage + 1);
    getMoreTodos(currentPage);
  };

  const renderLoader = () => {
    return <View>{isLoading ? <ActivityIndicator /> : null}</View>;
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
      <SafeAreaView style={styles.container}>
        <Header
          tab={tab}
          onTodoPress={onTodoPressHandler}
          onDonePress={onDonePressHandler}
        />
        {
          <View style={styles.body}>
            <FlatList
              data={tab === 'DONE' ? doneTodo : todos}
              renderItem={({item}) => (
                <ListItem
                  todo={item}
                  onPress={() => {
                    onIconClicked(
                      item.id,
                      item.title,
                      item.subTitle,
                      item.completed,
                    );
                  }}
                  onItemPress={() => {
                    onItemPressHandler(
                      item.id,
                      item.title,
                      item.subTitle,
                      item.completed,
                    );
                  }}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListFooterComponent={renderLoader}
              onMomentumScrollBegin={() =>
                setOnEndReachedCalledDuringMomentum(false)
              }
              onEndReached={() => {
                if (!onEndReachedCalledDuringMomentum) {
                  onEndReachedHandler();
                  setOnEndReachedCalledDuringMomentum(true);
                }
              }}
              onEndReachedThreshold={0.1}
            />
          </View>
        }

        <TouchableOpacity style={styles.button} onPress={onAddPressHandler}>
          <Icon name="plus-a" size={20} />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 15,
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
  indicator: {
    alignItems: 'center',
  },
});

export default Todo;
