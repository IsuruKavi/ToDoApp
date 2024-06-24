import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const addObjectValue = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue); // Saving task with unique key
      console.log('Task saved:', value);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const addData = async () => {
    const key = `@task_${Date.now()}`; // Generate a unique key for each task
    const task = { title, description, isDone: false, key };
    
    await addObjectValue(task, key); // Save task to AsyncStorage
    
    setTitle(''); // Clear input fields after adding task
    setDescription('');
    navigation.navigate("Home"); // Navigate back to HomeScreen after adding task
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Enter title"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          onChangeText={setDescription}
          value={description}
          placeholder="Enter description"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
      </View>
      <Pressable style={styles.button} onPress={addData}>
        <Text style={styles.buttonText}>+ Add</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50', // Green color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 12, // Add margin bottom for spacing
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 18,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF5733', // Orange color (you can adjust as needed)
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  cancelButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AddTaskScreen;
