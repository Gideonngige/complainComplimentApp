import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Dimensions, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { useRouter } from "expo-router";
import axios from 'axios';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from "react-native-chart-kit";

export default function Admin(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const data = {
        labels: ["Received", "Solved"],
        datasets: [
          {
            data: [45, 35]
          },
        ],
      };

    // handle new feedback
    const handleReport = () => {
        // alert('New Feedback');
        router.push('report/')
    }
    // end of handle new feedback

    // handle respond
    const handleRespond = () => {
        alert('Respond');
    }
    // end of handle respond

    if (loading) {
        return <ActivityIndicator size="large" color="#FFA500" />;
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-white justify-center items-center p-2 font-sans">
        {/* statistics part */}
        <View className='w-full m-2'>
        <Text className='text-lg font-bold'>Complaints Received vs Resolved</Text>

        <View className='mb-4 mt-4'>
        <BarChart
        data={data}
        width={Dimensions.get("window").width - 10} // Full width
        height={300}
        yAxisLabel=""
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "green",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(39, 114, 48, ${opacity})`, // Green bars
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#277230" },
        }}
        verticalLabelRotation={30} // Rotate labels for better visibility
        fromZero={true} // Start from zero
        showValuesOnTopOfBars={true} // Show values on bars
      />
      </View>

        <TouchableOpacity className="w-full h-20 justify-center items-center bg-green-800 p-4 mb-8 rounded-lg" onPress={handleReport}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Report</Text> }
      </TouchableOpacity>
      </View>
      {/* end of statistics part */}

      <ScrollView className="">
            {/* submitted feedbacks */}
            <Text className='w-full text-lg mt-5 font-bold'>Feedbacks</Text>
            <View className='w-full p-4 m-1 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>complain</Text>
                    <TouchableOpacity onPress={handleRespond}><Text className='font-bold text-green-800'>Respond</Text></TouchableOpacity>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>

            <View className='w-full p-4 m-1 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>compliment</Text>
                    <TouchableOpacity onPress={handleRespond}><Text className='font-bold text-green-800'>Respond</Text></TouchableOpacity>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>

            <View className='w-full p-4 m-1 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>12/03/2025</Text>
                    <Text className='font-bold text-green-800'>complain</Text>
                    <TouchableOpacity onPress={handleRespond}><Text className='font-bold text-green-800'>Respond</Text></TouchableOpacity>
                </View>
                <Text className='m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga. Aspernatur id nostrum ipsa, assumenda temporibus minus? Rerum architecto aut ipsam praesentium tempore earum. Iure doloribus harum excepturi at laboriosam.</Text>
            </View>
            {/* end of submitted feedbacks */}
            </ScrollView>

        <StatusBar/>
        </View>
        
        </SafeAreaView>
    );
}