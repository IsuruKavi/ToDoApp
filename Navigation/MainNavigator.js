import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddTaskScreen from '../Screens/AddTaskScreen';
import EditTaskScreen from '../Screens/EditTaskScreen';
import HomeScreen from '../Screens/HomeScreen';
import ViewTaskScreen from '../Screens/ViewTaskScreen';
;

const Stack = createStackNavigator();

export default function MainNavigator(){
    return( <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="EditTask" component={EditTaskScreen} />
          <Stack.Screen name="ViewTask" component={ViewTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>)
}