import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { useRouter } from "expo-router";
import axios from 'axios';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("llll");

    // fetch use data
    useEffect(() => {
        const fetchData = async () => {
          try {
            const email = await AsyncStorage.getItem('email');
            
            const url = `https://backend1-1cc6.onrender.com/getMember/${email}/`;
            const response = await axios.get(url);
            await AsyncStorage.setItem('email',email);
            
            if(response.status === 200){
              Toast.show({
                type: "success", // Can be "success", "error", "info"
                text1: "Successfully Login",
                text2: "You have successfully logged in",
              });
              
              setEmail(email);
        
            //   await AsyncStorage.setItem('member_id', response.data.member_id);
              
            }
            
          } 
          catch (error) {
            console.error("Error:", error);
            return null;
          }
        }
        fetchData();
    
      },[email]);
    // end of fetch user data

    // handle new feedback
    const handleNewFeedback = () => {
        // alert('New Feedback');
        router.push('feedback/')
    }
    // end of handle new feedback

    if (loading) {
        return <ActivityIndicator size="large" color="#FFA500" />;
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-2 font-sans">
            <View className='w-full bg-green-800 justify-center items-center h-20'>
                <Text className="text-xl font-bold text-white">{email}</Text>
            </View>

            {/* submitted feedbacks */}
            <Text className='w-full text-lg mt-5 font-bold'>Submitted Feedbacks</Text>
            <View className='w-80 p-4 m-2 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>complain</Text>
                    <Text className='font-bold text-green-800'>pending</Text>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>

            <View className='w-80 p-4 m-2 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>compliment</Text>
                    <Text className='font-bold text-green-800'>on-progress</Text>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>

            <View className='w-80 p-4 m-2 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>complain</Text>
                    <Text className='font-bold text-green-800'>solved</Text>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>

            <View className='w-80 p-4 m-2 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>complain</Text>
                    <Text className='font-bold text-green-800'>solved</Text>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>

            <View className='w-80 p-4 m-2 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>compliment</Text>
                    <Text className='font-bold text-green-800'>pending</Text>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>
            {/* end of submitted feedbacks */}

            <TouchableOpacity className="w-full bg-green-800 p-4 mb-8 rounded-lg" onPress={handleNewFeedback}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">New Feedback</Text> }
        
      </TouchableOpacity>

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}