import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {addTodo} from '../../services/todo';

const TodoCreate = ({navigation}) => {
  const [titleInput, setTitleInput] = useState('');
  const [subTitleInput, setSubTitleInput] = useState('');
  const [titleInputError, setTitleInputError] = useState('');
  const [subTitleInputError, setSubTitleInputError] = useState('');

  const onBackPressHandler = () => {
    navigation.goBack();
  };

  const onAddTodoPressHandler = () => {
    if (titleInput === '' && subTitleInput === '') {
      setTitleInputError('Title is required');
      setSubTitleInputError('Subtitle is required');
    } else if (titleInput === '') {
      setTitleInputError('Title is required');
    } else if (subTitleInput === '') {
      setSubTitleInputError('Subtitle is required');
    } else {
      addTodo(titleInput, subTitleInput);
      Alert.alert('Success', 'Todo added successfully!');
      setTitleInput('');
      setTitleInputError('');
      setSubTitleInput('');
      setSubTitleInputError('');
    }
  };

  return (
    <LinearGradient
      colors={['#d1d3ff', '#9A9CCD']}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.icon} onPress={onBackPressHandler}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>ADD TODO</Text>
        </View>

        <View style={styles.body}>
          <TextInput
            placeholder="TODO Title"
            value={titleInput}
            onChangeText={text => {
              setTitleInput(text);
              text === ''
                ? setTitleInputError('Title is required')
                : setTitleInputError('');
            }}
            style={styles.textInput}
          />
          <Text style={styles.errorText}>{titleInputError}</Text>
          <TextInput
            placeholder="TODO SubTitle"
            value={subTitleInput}
            onChangeText={text => {
              setSubTitleInput(text);
              text === ''
                ? setSubTitleInputError('Subtitle is required')
                : setSubTitleInputError('');
            }}
            style={styles.textInput}
          />
          <Text style={styles.errorText}>{subTitleInputError}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onAddTodoPressHandler}>
            <Text style={styles.buttonText}>Add Todo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 25,
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
  errorText: {
    alignSelf: 'flex-start',
    color: 'red',
    fontSize: 18,
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
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 20,
    marginTop: 20,
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
    alignSelf: 'center',
  },
  buttonText: {
    color: '#9A9CCE',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TodoCreate;
