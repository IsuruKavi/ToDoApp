import { View,Pressable,Text,StyleSheet } from "react-native";

export default function editButton({label,color,width=150,height=150,onPress}){

    return(
        <View>
            <Pressable style={[styles.button,{width:width,height:height,backgroundColor:color}]} onPress={onPress}>
                <Text styles={styles.buttonText}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
    },
  });