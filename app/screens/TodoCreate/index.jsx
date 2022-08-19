import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {addTodo} from '../../services/todo';

const TodoCreate = ({navigation}) => {
  const [titleInput, setTitleInput] = useState('');
  const [subTitleInput, setSubTitleInput] = useState('');

  const onBackPressHandler = () => {
    navigation.goBack();
  };

  const onAddTodoPressHandler = () => {
    if (titleInput === '' || subTitleInput === '') {
      Alert.alert('Error', 'Please input data!');
    } else {
      addTodo(titleInput, subTitleInput);
      Alert.alert('Success', 'Todo added successfully!');
      setTitleInput('');
      setSubTitleInput('');
    }
  };

  return (
    <LinearGradient
      colors={['#d1d3ff', '#9A9CCD']}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ADD TODO</Text>
      </View>
      <TouchableOpacity style={styles.icon} onPress={onBackPressHandler}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.body}>
        <TextInput
          placeholder="TODO Title"
          value={titleInput}
          onChangeText={text => setTitleInput(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="TODO SubTitle"
          value={subTitleInput}
          onChangeText={text => setSubTitleInput(text)}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.button} onPress={onAddTodoPressHandler}>
          <Text style={{color: '#9A9CCE', fontSize: 20, fontWeight: 'bold'}}>
            Add Todo
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2C3F4',
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
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
  },
  icon: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 8,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  textInputContainer: {
    padding: 5,
    flexDirection: 'row',
    borderRadius: 15,
    marginVertical: 9,
    width: 350,
    elevation: 3,
  },
  textInput: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 20,
    marginVertical: 15,
  },
  button: {
    marginVertical: 45,
    width: '50%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
    shadowOpacity: 1,
    elevation: 5,
  },
});

export default TodoCreate;
