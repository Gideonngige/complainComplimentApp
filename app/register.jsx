import {Text, View, StatusBar, TextInput, TouchableOpacity, Image,SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import "../global.css";
import { useRouter } from "expo-router";
import { router } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";


export default function Register(){
    const router = useRouter();
    const [fullname,setFullname] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Lecturer', value: 'Lecturer' },
      { label: 'Staff', value: 'Staff' },
      { label: 'Student', value: 'Student' },
    ]);

    //start of handle register
    const handleRegister = async() => {
      if(email == "" || value == "" || password == "" || confirmPassword == ""){
        Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Empty fields",
              text2: "Please fill in all fields",
              position:"center",
            });
        return;
      }
      else{
      if(password == confirmPassword){
        setIsLoading(true);
        try {
          const url = "https://complaincomplimentbackend.onrender.com/register/";
          const data = {
              email: email,
              role: value,
              password: password,
          };
  
          console.log("Sending data:", data);  // Log request data
  
          const response = await axios.post(url, data, {
              headers: { "Content-Type": "application/json" },
          });
  
          console.log("Response received:", response.data);  // Log response
          // alert(response.data.message || "Registration successful!");
          Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Successfully",
            text2: response.data.message,
            position:"center",
          });
          if(response.data.message == "Successfully registered"){
            router.push("/");
          }
          else{
            Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Failed registration",
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
    else{
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Password mismatch",
        text2: "Password do not match",
        position:"center",
      });
      // alert("Passwords do not match");
    }
  }
  }
    // end of handle register

    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Text className="text-xl text-green-800 font-bold">Register</Text>
    <View className="w-full">

    <Text className="w-full text-green-800 text-lg font-bold">Enter your email</Text>
      <TextInput 
      placeholder="Enter your email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-green-800 text-gray-400 text-lg"
      />
    <Text className="text-lg text-green-800 font-bold">Select role</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select your role"
        style={{borderColor: '#277230',borderWidth: 2,  
        }}
        listMode="SCROLLVIEW"
      />
    </View>
      
      <Text className="w-full mt-6 text-green-800 text-lg font-bold">Enter your password</Text>
      <TextInput 
      placeholder="Enter your password"
      secureTextEntry 
      value={password}
      onChangeText={setPassword}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-green-800 text-gray-400 text-lg"
      />
      <Text className="w-full text-green-800 text-lg font-bold">Confirm your password</Text>
      <TextInput 
      placeholder="Confirm your password"
      secureTextEntry 
      value={confirmPassword}
      onChangeText={setConfirmPassword}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-2 border border-green-800 text-gray-400 text-lg"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-2" onPress={() => alert("Got to forgot password page")}>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-green-800 p-4 rounded-lg" onPress={handleRegister}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Register</Text>}
      </TouchableOpacity>
      <View className="flex-row justify-center mt-4">
      <Text className="text-lg">Already have an account? </Text>
      <TouchableOpacity onPress={() => router.push("/")}>
      <Text className="text-lg text-green-800">Login</Text>
      </TouchableOpacity>
      </View>
      <Toast/>
      <StatusBar/>
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}