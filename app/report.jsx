import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { useRouter } from "expo-router";
import axios from 'axios';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Report(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                <Text className="text-4xl font-bold text-white">Report on complains</Text>
            </View>

            {/* start of report */}
            <View className='w-full p-4 m-2 mb-8 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>ad-hoc</Text>
                    <Text className='font-bold text-green-800'>John Doe</Text>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, aliquid facere, aliquam nobis magnam fugit suscipit doloribus, beatae quasi aut voluptatem amet illo perspiciatis ducimus ab quod? Quidem, quae rerum?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, enim. Aut vero, excepturi ducimus voluptas, accusamus id qui, minima possimus cum amet quis dicta. Praesentium, quibusdam nesciunt! Voluptates, nemo eveniet!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo ex a velit numquam quasi dignissimos ratione? Dolorum deleniti consectetur exercitationem blanditiis libero, aperiam, asperiores expedita beatae, rem dignissimos ratione!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam aspernatur beatae amet ratione quidem non ducimus officia, quibusdam suscipit culpa, fugit sequi officiis, quae voluptatum aliquam eaque reiciendis a illum!
                </Text>
            </View>


            {/* end of report */}

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}