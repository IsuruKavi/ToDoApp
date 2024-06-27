import { Pressable,View,Text} from "react-native";
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function Tick({ element, refreshTasks }){
  
    const [isDone,setIsDone]=useState(element.isDone);
    
    const onPressTick1=()=>{
        const value={title:element.title,description:element.description,key:element.key,isDone:!isDone}
        setObjectValue(element.key,value)
        
        setIsDone(!isDone)
        refreshTasks()
        
        
        
    }
    setObjectValue = async (key,value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.mergeItem(key, jsonValue)
        } catch(e) {
          // save error
        }}
    return(<View>
        <Pressable onPress={onPressTick1}>
            <Text>{isDone?<AntDesign name="checkcircle" size={25} color="green" />:<Entypo name="circle" size={25} color="red" />}
            </Text></Pressable>
    </View>)
    
                                                                                                                                         
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      