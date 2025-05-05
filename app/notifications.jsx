import { SafeAreaView, ScrollView, Text, View, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notifications() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Alert component
  const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-green-800 p-3 rounded-lg">
        <Text className="text-white font-bold">You have 0 notifications</Text>
      </View>
    );
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const email = await AsyncStorage.getItem('email');
      setLoading(true);
      try {
        const response = await axios.get(`https://complaincomplimentbackend.onrender.com/notification/${email}/`);
        if(response.status === 200){
          setNotifications(response.data);
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const NotificationItem = ({ date, time, message, adminmessage }) => {
    return (
      <View className="w-full bg-white p-3 rounded-lg m-2 shadow-lg">
        {/* Date and Event Title */}
        <View className="flex-row justify-between bg-white p-3 rounded-lg">
          <Text className="font-bold text-green-800">{date}</Text>
          <Text className="font-bold text-green-800">{time}</Text>
        </View>
        <View className='bg-gray-100 rounded-lg shadow-sm'>
        <Text className="text-gray-600 p-2"><Text className='font-bold'>You</Text> {'\n'} {message}</Text>
        </View>

        <View>
        <Text className="">{adminmessage}</Text>
        </View>
        
       
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#166534" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="">
      
        <View className="bg-white  p-5 font-sans">
          {notifications.length === 0 ? (
            <Alert />
          ) : (
            
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.response_id.toString()}
              renderItem={({ item }) => <NotificationItem  date={item.response_date.split("T")[0]} time={item.response_date.split("T")[1].split(".")[0]} message={item.message} adminmessage={item.response} />}
              
            /> 
          )}

            
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
