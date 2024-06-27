import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert,Pressable } from 'react-native';

export default function AddToDo({navigation}) {
 
  return (<View><Pressable style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
  <Text style={styles.buttonText}>+ Add</Text>
</Pressable></View>)
}





const styles=StyleSheet.create({  addButton: {
  backgroundColor: '#2196F3', // Blue color
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
  marginBottom: 10,
},})