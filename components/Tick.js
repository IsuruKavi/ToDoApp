import { Pressable,View,Text} from "react-native";
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
            <Text style={{color:isDone?"#00FF00":"#FF0000"}}>{isDone?"Done":"Todo"}
            </Text></Pressable>
    </View>)
    
                                                                                                                                         
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      