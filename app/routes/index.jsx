import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Todo from '../screens/Todo';
import TodoCreate from '../screens/TodoCreate';
import TodoEdit from '../screens/TodoEdit';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Todo" component={Todo} />
      <Stack.Screen name="TodoCreate" component={TodoCreate} />
      <Stack.Screen name="TodoEdit" component={TodoEdit} />
    </Stack.Navigator>
  );
};

export default Routes;
