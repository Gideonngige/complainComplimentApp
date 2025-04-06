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
    const [email, setEmail] = useState("youremail@example.com");
    const [feedbacks, setFeedbacks] = useState([]);

    // fetch use data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

          try {
            const email = await AsyncStorage.getItem('email');
            setEmail(email);
            
            const url = `https://complaincomplimentbackend.onrender.com/getfeedbacks/${email}/`;
            const response = await axios.get(url);
            if(response.status === 200){
              Toast.show({
                type: "success", // Can be "success", "error", "info"
                text1: "Successfully Login",
                text2: "You have successfully logged in",
              });
              setEmail(email);
              setFeedbacks(response.data);
              
            }
            
          } 
          catch (error) {
            console.error("Error:", error);
            return null;
          }
          finally{
            setIsLoading(false);
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

    // feedback component
    const Feedback = ({create_at, title, status, message, category }) => {
        return (
          <View className='w-80 p-4 m-2 bg-white rounded-lg shadow-lg'>
          <View className="flex-row justify-between bg-white p-3 rounded-lg">
              <Text className='font-bold text-green-800'>{create_at}</Text>
              <Text className='font-bold text-green-800'>{title}</Text>
              <Text className='font-bold text-green-800'>{status}</Text>
          </View>
          <Text className='m-3'>{message}</Text>
          <View className="flex-row justify-between bg-white p-3 rounded-lg">
            <Text className='font-bold text-green-800'>{category}</Text>
          </View>
      </View>
        )
    }
    // end of feedback component

    // Alert component
  const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-green-800 p-3 rounded-lg">
        <Text className="text-white font-bold">You have 0 notifications</Text>
      </View>
    );
  };

    if (loading) {
        return <ActivityIndicator size="large" color="#2F6F3A" />;
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-2 font-sans">
            <View className='w-full bg-green-800 justify-center items-center h-20'>
                <Text className="text-xl font-bold text-white">{email}</Text>
            </View>
            <Text className='w-full text-lg mt-5 font-bold'>Submitted Feedbacks</Text>

            {/* submitted feedbacks */}

            {feedbacks.length == 0 ? (
            <Alert />
          ) : (
            <FlatList
              data={feedbacks}
              keyExtractor={(item) => item.feedback_id.toString()}
              renderItem={({ item }) => <Feedback create_at={item.created_at.split("T")[0]} title={item.title} status={item.status} message={item.message} category={item.category} />}
            /> 
          )}
            {/* end of submitted feedbacks */}

            <TouchableOpacity className="w-full bg-green-800 mt-4 p-4 mb-8 rounded-lg" onPress={handleNewFeedback}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">New Feedback</Text> }
        
      </TouchableOpacity>
        <Toast/>

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}