import { Text, View, Switch, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import '../global.css';
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import axios from "axios";

export default function AdminResponse() {
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'on-progress', value: 'on-progress' },
        { label: 'resolved', value: 'resolved' },
    ]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const message = await AsyncStorage.getItem('message');
      setMessage(message);
    };
    fetchFeedback();
  }, []);

  // start of handle login
  const handleRespond = async() => {
    const message = await AsyncStorage.getItem('message');
    const feedback_id = await AsyncStorage.getItem('feedback_id');
    const email = await AsyncStorage.getItem('email');
    setMessage(message);
    // alert(feedback_id);
    // alert(message);
    if(message === "" || value === "" || responseMessage === ""){
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }
    else{
      setIsLoading(true);
    try{
      const url = "https://complaincomplimentbackend.onrender.com/adminresponse/";
          const data = {
              email: email,
              feedback_id: feedback_id,
              message: message,
              response: responseMessage,
              status: value,
          };
  
          const response = await axios.post(url, data, {
              headers: { "Content-Type": "application/json" },
          });

          if(response.status === 200){
            Toast.show({
              type: "success",
              text1: "Successfully",
              text2: response.data.message,
            });
            setMessage("");
            setResponseMessage("");
            setValue(null);
          }
          else{
            Toast.show({
              type: "error",
              text1: "Failed to respond",
              text2: response.data.message,
            });
          }

    }
    catch(error){
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while responding",
      });
    }
    finally{
      setIsLoading(false);
    }
  }
    // router.push('register/');
    
  }
  // end of handle login
 
  
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Text className="w-full text-green-800 text-lg font-bold">Feedback message</Text>
      <TextInput 
      placeholder="Hello i have a complain and compliment, complain-there is no wifi in mph, and when it is available it is slow, compliment-the food is good"
      value={message}
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
      placeholder="Type your response message here..."
      value={responseMessage}
      onChangeText={setResponseMessage} 
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
