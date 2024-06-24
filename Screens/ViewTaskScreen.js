import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewTaskScreen({ navigation, route }) {
      const { element,title,description,key,isDone} = route.params;
      
      const [todo,setToDo]=useState(element)
      
      getMyObject = async (key) => {
            try {
              const jsonValue = await AsyncStorage.getItem(key)
              const todo_= jsonValue != null ? JSON.parse(jsonValue) : null
              setToDo(todo_)
            } catch(e) {
              // read error
            }
          
            
          }
          useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
              getMyObject(key);
            });
            return unsubscribe;
          }, [navigation]);

      return (
            <View style={styles.container}>
                  <Text style={styles.header}>{`View Task: ${todo.title}`}</Text>
                  <Text style={styles.description}>{todo.description}</Text>

                  <Pressable style={styles.editButton} onPress={() => navigation.navigate("EditTask", { title: title, description: description ,key:key,isDone:isDone})}>
                        <Text style={styles.buttonText}>Edit</Text>
                  </Pressable>

                  <Pressable style={styles.cancelButton} onPress={() => navigation.navigate("Home")}>
                        <Text style={styles.buttonText}>Cancel</Text>
                  </Pressable>
            </View>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 20,
      },
      header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
      },
      description: {
            fontSize: 18,
            marginBottom: 20,
      },
      editButton: {
            backgroundColor: '#4CAF50',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            marginBottom: 10,
      },
      cancelButton: {
            backgroundColor: '#FF5733',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
      },
      buttonText: {
            color: '#fff',
            fontSize: 18,
            textAlign: 'center',
      },
});
