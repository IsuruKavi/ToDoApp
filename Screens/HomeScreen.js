import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Todo from '../components/Todo';
import AddToDo from '../components/AddToDo';

const HomeScreen = ({ navigation }) => {
  const [toDoData, setToDoData] = useState([]);

  const refreshTasks = () => {
    // Refresh tasks or fetch tasks again from AsyncStorage
    fetchTasks(); 
  };

  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
      setToDoData((prevTasks) => prevTasks.filter((task) => task.key !== key));
    } catch(e) {
      // remove error
    }
  };

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

  const renderItem = ({ item }) => (
    <View key={item.key}>
      <Todo
        isDone={item.isDone}
        label={item.title}
        onPress={() => navigation.navigate("ViewTask", {
          title: item.title,
          description: item.description,
          key: item.key,
          isDone: item.isDone,
          element: item
        })}
        onPressEdit={() => navigation.navigate("EditTask", {
          title: item.title,
          description: item.description,
          key: item.key,
          isDone: item.isDone
        })}
        onPressDelete={() => { removeValue(item.key) }}
        element={item}
        refreshTasks={refreshTasks}
      />
    </View>
  );

  // Filter the toDoData into two separate arrays
  const notDoneTasks = toDoData.filter(item => !item.isDone);
  const doneTasks = toDoData.filter(item => item.isDone);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Todo List</Text>
      </View>
      <AddToDo navigation={navigation} />

      <FlatList
        data={notDoneTasks}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
        ListHeaderComponent={() => <Text style={styles.subHeader}>Pending Tasks</Text>}
        ListEmptyComponent={() => <Text style={styles.noTasks}>No tasks</Text>}
      />
      <FlatList
        data={doneTasks||<Text>No tasks</Text>}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
        ListHeaderComponent={() => <Text style={styles.subHeader}>Completed Tasks</Text>}
        ListEmptyComponent={() => <Text style={styles.noTasks}>No tasks</Text>}
      />
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
  subHeader: {
    color: '#000000',
    fontSize: 24,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  noTasks: {
    color: '#888888',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default HomeScreen;
