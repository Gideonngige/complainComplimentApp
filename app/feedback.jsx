import { Text, View, Switch, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import '../global.css';
import { useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import axios from "axios";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'complain', value: 'complain' },
      { label: 'compliment', value: 'compliment' },
    ]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
      { label: 'academic', value: 'academic' },
      { label: 'health and wellness', value: 'health and wellness' },
      {label: 'administration and support', value: 'administration and support'},
      {label: 'ict and communication', value: 'ict and communication'},
      {label: 'student services', value: 'student services'},
      {label: 'maintenance and environment', value: 'maintenance and environment'},
    ]);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // start of handle login
  const handleSubmitFeedback = async() => {
     if(value == "" || value2 == "" || message == ""){
            Toast.show({
                  type: "error", // Can be "success", "error", "info"
                  text1: "Empty fields",
                  text2: "Please fill in all fields",
                  position:"center",
                });
            return;
          }
          else{
            setIsLoading(true);
            try {
              const email = await AsyncStorage.getItem('email');
              const url = "https://complaincomplimentbackend.onrender.com/feedbacks/";
              const data = {
                  email: email,
                  title: value,
                  category: value2,
                  message: message,
                  anonymous: isEnabled,
              };
      
              console.log("Sending data:", data);  // Log request data
      
              const response = await axios.post(url, data, {
                  headers: { "Content-Type": "application/json" },
              });
      
              console.log("Response received:", response.data);  // Log response
              // alert(response.data.message || "Registration successful!");
              
              if(response.status === 200){
                if(response.data.message == "Feedback was successfully submitted"){
                  Toast.show({
                    type: "success", 
                    text1: "Successfully",
                    text2: response.data.message,
                    position:"center",
                  });
                  setMessage("");
                  setValue(null);
                  setValue2(null);

                  router.push("home/");
                }else{
                  Toast.show({
                    type: "error", 
                    text1: "Failed to submit feedback",
                    text2: response.data.message,
                    position:"center",
                  });
                }
                
        
              }
              else{
                Toast.show({
                  type: "error", // Can be "success", "error", "info"
                  text1: "Failed to submit feedback",
                  text2: response.data.message,
                  position:"center",
                });
                // alert(response.data.message);
              }
      
          } 
          catch (error) {
              // console.error("Error during registration:", error);
      
              if (error.response) {
                  // console.error("Server Error:", error.response.data);
                  Toast.show({
                    type: "error", // Can be "success", "error", "info"
                    text1: "Error",
                    text2: error.response.data.message,
                    position:"center",
                  });
                  // alert("Server Error: " + JSON.stringify(error.response.data));
              } else {
                  console.error("Network Error:", error.message);
                  Toast.show({
                    type: "error", // Can be "success", "error", "info"
                    text1: "Network Error",
                    text2: error.message,
                    position:"center",
                  });
                  // alert("Network Error: " + error.message);
              }
          }
          finally{
            setIsLoading(false);
          }
      }
    
  }
  // end of handle login
 
  
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4" >
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <View className="w-full mb-4">
    <Text className="text-lg text-green-800 font-bold">Title</Text>
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
        zIndex={3000}
        zIndexInverse={1000}
        listMode="SCROLLVIEW"
      />
    </View>

    <View className="w-full mb-4">
    <Text className="text-lg text-green-800 font-bold">Select category</Text>
      <DropDownPicker
        open={open2}
        value={value2}
        items={items2}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setItems2}
        placeholder="Select"
        style={{borderColor: '#277230',borderWidth: 2,  
        }}
        zIndex={2000}
        zIndexInverse={1000}
        listMode="MODAL"
      />
    </View>

      <Text className="w-full text-green-800 text-lg font-bold">Enter your complain or compliment</Text>
      <TextInput 
      placeholder="complain or compliment"
      value={message}
      multiline
      numberOfLines={4}
      onChangeText={setMessage} 
      className="w-full bg-white p-4 h-40 rounded-lg shadow-md border border-gray-300"
      />

    <View className="w-full flex-1 justify-center items-center">
      <View className="w-full flex-row items-center space-x-3 bg-white p-3 rounded-lg shadow-md">
        <Switch
          trackColor={{ false: "#277230", true: "#277230" }} // Gray when off, green when on
          thumbColor={isEnabled ? "#277230" : "#f4f4f5"} // Green thumb when on
          ios_backgroundColor="#d1d5db"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} // Enlarging the switch
        />
        <Text className="text-lg ml-6 font-semibold text-gray-800">
          {isEnabled ? "Anonymous" : "Not Anonymous"}
        </Text>
      </View>
    </View>

      <TouchableOpacity className="w-full mt-6 mb-6 bg-green-800 p-4 rounded-lg" onPress={handleSubmitFeedback}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Submit Feedback</Text> }
        
      </TouchableOpacity>
      <Toast/>
      <StatusBar
      barStyle="dark-content" // or "light-content" depending on your background
      backgroundColor="transparent"
      translucent={true}
      />
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}
