import { Text, View, Switch, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import '../global.css';
import { useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default function AdminResponse() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'on-progress', value: 'on-progress' },
        { label: 'solved', value: 'solved' },
    ]);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // start of handle login
  const handleRespond = () => {
    router.push('register/');
    
  }
  // end of handle login
 
  
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Text className="w-full text-green-800 text-lg font-bold">Feedback message</Text>
      <TextInput 
      placeholder="Hello i have a complain and compliment, complain-there is no wifi in mph, and when it is available it is slow, compliment-the food is good"
      value={receivedMessage}
      onChangeText={setReceivedMessage} 
      className="w-full p-4 h-40 bg-white rounded-lg shadow-sm mb-6 border border-green-800 text-gray-400 text-lg"
      />

    <View className="w-full mb-4">
    <Text className="text-lg text-green-800 font-bold">Status</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select"
        style={{borderColor: '#277230',borderWidth: 2,  
        }}
        listMode="SCROLLVIEW"
      />
    </View>
      <Text className="w-full text-green-800 text-lg font-bold">Response message</Text>
      <TextInput 
      placeholder="complain or compliment"
      value={message}
      onChangeText={setMessage} 
      className="w-full p-4 h-40 bg-white rounded-lg shadow-sm mb-6 border border-green-800 text-gray-400 text-lg"
      />

      <TouchableOpacity className="w-full mt-6 mb-6 bg-green-800 p-4 rounded-lg" onPress={handleRespond}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Respond</Text> }
        
      </TouchableOpacity>
      <Toast/>
      <StatusBar/>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}
