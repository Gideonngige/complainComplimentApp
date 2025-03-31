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
    const [month, setMonth] = useState("");
    const [complains, setComplains] = useState(0);
    const [compliments, setCompliments] = useState(0);
    const [resolved, setResolved] = useState(0)
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);
    const [report, setReport] = useState("");
    const [reportDate,setReportDate] = useState("");

    // generate report
    useEffect(() => {
        const generateReport = async () => {
            try{
                setLoading(true);
                const url = `https://complaincomplimentbackend.onrender.com/getreport/`;
                const response = await axios.get(url);
                if(response.status === 200){
                    setMonth(response.data[0].month);
                    setComplains(response.data[0].total_complaints);
                    setCompliments(response.data[0].total_compliments);
                    setResolved(response.data[0].total_resolved);
                    setTotalFeedbacks(response.data[0].total_feedbacks);
                    setReportDate(response.data[0].report_date);
                    const newReport = `The following is a report of ${month} on the complains and compliments received. As of today ${month} the department has received a total of  ${totalFeedbacks} from the staffs, lecturers, and students. From the feedbacks that were received, ${complains} were complains and ${compliments} were compliments. Throught this month the department have been able to resolve ${resolved} feedbacks.`;
                    setReport(newReport);
                }

            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        generateReport();
    }, []);
    // end of generate report

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
                    <Text className='font-bold text-green-800'>{reportDate.split("T")[0]}</Text>
                    <Text className='font-bold text-green-800'>{reportDate.split("T")[1].split(".")[0]}</Text>
                    <Text className='font-bold text-green-800'>John Doe</Text>
                </View>
                <Text className='m-3'>{report}</Text>
            </View>


            {/* end of report */}

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}