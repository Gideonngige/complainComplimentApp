import { Text, View, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native";
import '../global.css';
import { useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import axios from "axios";

export default function Index() {
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // start of handle login
  const handleLogin = async () => {
    if(email == "" || password == ""){
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Empty fields",
        text2: "Please fill in all fields",
      });
      return;
    }
    else{
    setIsLoading(true);
    try {
      const url = `https://complaincomplimentbackend.onrender.com/login/${email}/${password}/`;
      const response = await axios.get(url);
      const url2 = `https://complaincomplimentbackend.onrender.com/getuser/${email}/`;
      const response2 = await axios.get(url2);
      
      
      if (response.status === 200 && response2.status === 200) {
        const message = response.data.message; 
        if(message == "Successfully logged in"){
          await AsyncStorage.setItem('email', email);
          // router.push("/home");
          if(response2.data.role == "admin"){
            await AsyncStorage.setItem('department', response2.data.department);
            switch(response2.data.department){
              case "academic":
                router.push("admin/");
                break;
              case "health and wellness":
                router.push("admin/");
                break;
              case "administration and support":
                router.push("admin/");
                break;
              case "ict and communication":
                router.push("admin/");
                break;
              case "student services":
                router.push("admin/");
                break;
              case "maintenance and environment":
                router.push("admin/");
                break;
              default:
                Toast.show({
                  type: "error", 
                  text1: "No department found",
                  text2: "You have not been assigned to any department",
                });
                break;
            }
          }
          else{
            router.push("home/");

          }
      
        }
        else{
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: message,
          });
          // alert(message);
        }
        return message;
      } else {
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "Login failed",
          text2: response.data,
        });
        // alert("Login Failed:", response.data);
        return null;
      }
    } catch (error) {
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Login failed",
        text2: error.message,
      });
      return null;
    }
    finally{
      setIsLoading(false);
    }
  }
  };
   // end of handle login

  // start of handle forgot password
  const handleForgotPassword = async() => {
    try {
      if(email === ""){
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "Empty field",
          text2: "Please provide an email",
        });
      }
      else{
      const url = `https://complaincomplimentbackend.onrender.com/resetpassword/${email}/`;
      const response = await axios.get(url);
      Toast.show({
        type: "success", // Can be "success", "error", "info"
        text1: "Password reset",
        text2: response.data.message,
      });
      }
      
      // alert(response.data.message);
    } catch (error) {
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Error occurred please try again",
        text2: error,
      });
      // console.error("Error logging in:", error);
      return null;
    }

  }
  // end of handle forgot password


  
 
 
  
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Text className="text-3xl font-bold text-green-800 mb-1">LOGIN</Text>
      <Image source={require('../assets/images2/login.png')} className="w-full h-56 mb-2" style={{ resizeMode:"contain", height:150}}/>
      <Text className="w-full text-green-800 text-lg font-bold">Enter your email</Text>
      <TextInput 
      placeholder="Enter your email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-green-800 text-gray-400 text-lg"
      />
      <Text className="w-full text-green-800 text-lg font-bold">Enter your password</Text>
      <TextInput 
      placeholder="Enter your password"
      secureTextEntry
      value={password}
      onChangeText={setPassword} 
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-2 border border-green-800 text-gray-400 text-lg"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-4" onPress={handleForgotPassword}>
      <Text className="text-lg">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-green-800 p-4 rounded-lg" onPress={handleLogin}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Login</Text> }
        
      </TouchableOpacity>
      <View className="flex-row justify-center mt-4">
      <Text className="text-lg">Do not have an account? </Text>
      <TouchableOpacity onPress={() => router.push("/register")}>
      <Text className="text-lg text-green-800">Register</Text>
      </TouchableOpacity>
      </View>
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
