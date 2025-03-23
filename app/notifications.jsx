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
      try {
        const response = await axios.get(`https://backend1-1cc6.onrender.com/get_notifications/${email}/`);
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  const NotificationItem = ({ date, type, message }) => {
    return (
      <View className="w-full bg-yellow-600 p-3 rounded-lg mb-5">
        {/* Date and Event Title */}
        <View className="flex-row justify-between bg-yellow-600 p-3 rounded-lg">
          <Text className="font-bold text-white">{date}</Text>
          <Text className="font-bold text-white">{type}</Text>
        </View>

        {/* Divider */}
        <View className="border-b border-gray-300 my-2"></View>

        {/* Description */}
        <Text className="text-white">{message}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FFA500" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="">
      
        <View className="bg-white  p-5 font-sans">
          {notifications.length > 0 ? (
            <Alert />
          ) : (
            
            <View className='w-full p-4 m-2 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>compliment</Text>
                    <Text className='font-bold text-green-800'>addressed</Text>
                </View>
                <Text className='m-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non...</Text>
                <Text className='m-1 text-green-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>
          )}
          <View className='w-80 p-4 m-2 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>compliment</Text>
                    <Text className='font-bold text-green-800'>addressed</Text>
                </View>
                <Text className='m-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non...</Text>
                <Text className='m-1 text-green-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>

            <View className='w-80 p-4 m-2 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>compliment</Text>
                    <Text className='font-bold text-green-800'>addressed</Text>
                </View>
                <Text className='m-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non...</Text>
                <Text className='m-1 text-green-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>
          <StatusBar />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}
