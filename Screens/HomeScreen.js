import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Todo from '../components/Todo';

const HomeScreen = ({ navigation }) => {
  const [toDoData, setToDoData] = useState([]);
  // clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear()
  //   } catch(e) {
  //     // clear error
  //   }
  
  
  //   console.log('Done.')
  // }
  const refreshTasks = () => {
    // Refresh tasks or fetch tasks again from AsyncStorage
    fetchTasks(); // Assuming fetchTasks fetches tasks from AsyncStorage and updates state
  };

  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
      setToDoData((prevTasks) => prevTasks.filter((task) => task.key !== key));
    } catch(e) {
      // remove error
    }
  
   
  } 
  // Fetch tasks on initial render
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTasks();
    });
    return unsubscribe;
  }, [navigation]);
  const fetchTasks = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const tasks = await AsyncStorage.multiGet(keys);
      const parsedTasks = tasks.map(([key, value]) => JSON.parse(value));
      setToDoData(parsedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

    
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Todo List</Text>
      </View>
      <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.buttonText}>+ Add</Text>
      </Pressable>

      {toDoData.map((element) => {
        if (element.isDone === false) {
          return (
            <View key={element.id}>
              <Todo
                isDone={element.isDone} // Note: Check if this should be isDone or isdone (case-sensitive)
                label={element.title}
                onPress={() =>
                  navigation.navigate("ViewTask", {title: element.title,
                    description: element.description,key:element.key,isDone:element.isDone,element:element})
                }
                onPressEdit={()=>navigation.navigate("EditTask",{title: element.title,
                  description: element.description,key:element.key,isDone:element.isDone})}
                onPressDelete={()=>{removeValue(element.key)}}
                element={element}
                refreshTasks={refreshTasks}
              />
            </View>
          );
        } else {
          return null; // If element.isDone is not "false", return null (or you can handle it differently as needed)
        }
      })}
      {toDoData.map((element) => {
        if (element.isDone === true) {
          return (
           
            <View key={element.id}>
              <Todo
                isDone={element.isDone} // Note: Check if this should be isDone or isdone (case-sensitive)
                label={element.title}
                onPress={() =>
                  navigation.navigate("ViewTask", {title: element.title,
                    description: element.description,key:element.key,isDone:element.isDone,element:element})
                }
                onPressEdit={()=>navigation.navigate("EditTask",{title: element.title,
                  description: element.description,key:element.key,isDone:element.isDone,})}
                onPressDelete={()=>{removeValue(element.key)}}
                element={element}
                refreshTasks={refreshTasks}
                
              />
            </View>
          );
        } else {
          return null; // If element.isDone is not "false", return null (or you can handle it differently as needed)
        }
      })}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    color: '#000000',
    fontSize: 50,
  },
  addButton: {
    backgroundColor: '#2196F3', // Blue color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
