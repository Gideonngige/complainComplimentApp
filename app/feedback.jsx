import { Text, View, Switch, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import '../global.css';
import { useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Complain', value: 'Complain' },
      { label: 'Compliment', value: 'Compliment' },
    ]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
      { label: 'Academic', value: 'Academic' },
      { label: 'Finance', value: 'Finance' },
    ]);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // start of handle login
  const handleSubmitFeedback = () => {
    router.push('register/');
    
  }
  // end of handle login
 
  
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
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
        listMode="SCROLLVIEW"
      />
    </View>

      <Text className="w-full text-green-800 text-lg font-bold">Enter your complain or compliment</Text>
      <TextInput 
      placeholder="complain or compliment"
      value={message}
      onChangeText={setMessage} 
      className="w-full p-4 h-40 bg-white rounded-lg shadow-sm mb-6 border border-green-800 text-gray-400 text-lg"
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
      <StatusBar/>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}
