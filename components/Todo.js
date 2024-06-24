import React from 'react';
import { Text, View, StyleSheet, Button,Pressable } from 'react-native';
import Tick from './Tick';

export default function Todo({ label,onPress,refreshTasks,onPressEdit,onPressDelete,element}) {
  return (
    <View style={styles.container}>
      
      <Tick element={element} refreshTasks={refreshTasks}/>
      <Pressable onPress={onPress}><Text style={styles.label}>{label}</Text></Pressable>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          color="#87CEEB"
          onPress={onPressEdit}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete"
          color="#FF0000"
          onPress={onPressDelete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    marginHorizontal:5,
    fontSize:20
  },
  buttonContainer: {
    marginLeft: 10,
  },
});
