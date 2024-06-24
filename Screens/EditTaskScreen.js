import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Pressable,SafeAreaView} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditTaskScreen({navigation,route}){
      const {title,description,key,isDone}=route.params

      const [title_, onChangetitle] = React.useState(title);
      const [description_, onChangeDescription] = React.useState(description);
      setObjectValue = async (key,value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.mergeItem(key, jsonValue)
        } catch(e) {
          // save error
        }
      
      
      }
      const pressSave =()=>{
            const value={title:title_,description:description_,isDone:isDone,key:key}
            setObjectValue(key,value)
            console.log("Edited")
            navigation.goBack()

      }
      
      return (
            <SafeAreaView style={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangetitle}
                  value={title_}
                  placeholder="Enter title"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  onChangeText={onChangeDescription}
                  value={description_}
                  placeholder="Enter description"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                />
              </View>
              <Pressable style={styles.button} onPress={pressSave}>
                <Text style={styles.buttonText}>save</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
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
        
      
        