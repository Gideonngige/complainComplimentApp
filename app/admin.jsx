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
    const [feedbacks, setFeedbacks] = useState([]);
    const [academicReceived, setAcademicReceived] = useState(0);
    const [academicResolved, setAcademicResolved] = useState(0);
    const [administrationReceived, setAdministrationReceived] = useState(0);
    const [administrationResolved, setAdministrationResolved] = useState(0);
    const [healthReceived, setHealthReceived] = useState(0);
    const [healthResolved, setHealthResolved] = useState(0);
    const [ictReceived, setIctReceived] = useState(0);
    const [ictResolved, setIctResolved] = useState(0);
    const [studentServicesReceived, setStudentServicesReceived] = useState(0);
    const [studentServicesResolved, setStudentServicesResolved] = useState(0);
    const [maintenanceReceived, setMaintenanceReceived] = useState(0);
    const [maintenanceResolved, setMaintenanceResolved] = useState(0);

    const receivedData = {
        labels: ["Academic", "Admistration", "Health", "ICT","Student Services", "Maintenance"],
        datasets: [
          {
            data: [academicReceived, administrationReceived, healthReceived, ictReceived, studentServicesReceived, maintenanceReceived]
          },
        ],
      };

      const resolvedData = {
        labels: ["Academic", "Admistration", "Health", "ICT","Student Services", "Maintenance"],
        datasets: [
          {
            data: [academicResolved, administrationResolved, healthResolved, ictResolved, studentServicesResolved, maintenanceResolved]
          },
        ],
      };


      
    
    // fetching received and resolved feedbacks 
    useEffect(() => {
      const fetchReceivedResolved = async() => {
        try{
          const response = await axios.get(`https://complaincomplimentbackend.onrender.com/countreceivedresolved/`);
          if(response.status === 200){
              Toast.show({
                type: "success",
                text1: "Successfully",
                text2: "Feedbacks fetched successfully",
          });
          setAcademicReceived(response.data.academic_received);
          setAcademicResolved(response.data.academic_resolved);
          setAdministrationReceived(response.data.administration_received);
          setAdministrationResolved(response.data.administration_resolved);
          setHealthReceived(response.data.health_received);
          setHealthResolved(response.data.health_resolved);
          setIctReceived(response.data.ict_received);
          setIctResolved(response.data.ict_resolved);
          setStudentServicesReceived(response.data.student_received);
          setStudentServicesResolved(response.data.student_resolved);
          setMaintenanceReceived(response.data.maintenance_received);
          setMaintenanceResolved(response.data.maintenance_resolved);
          }

        }
        catch(error){
          console.error(error);
        }
      }
      fetchReceivedResolved();
    }, []);
    // end of fetching received and resolved feedbacks

    // start fetch feedbacks
    useEffect(() => {
        const fetchFeedbacks = async () => {
          const department = await AsyncStorage.getItem('department');
            setLoading(true);
            try{
                const response = await axios.get(`https://complaincomplimentbackend.onrender.com/getadminfeedbacks/${department}/`);
                if(response.status === 200){
                    Toast.show({
                        type: "success",
                        text1: "Successfully",
                        text2: "Feedbacks fetched successfully",
                    });
                    setFeedbacks(response.data);
                }

            }
            catch(error){
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchFeedbacks();
    },[]);
    // end of fetch feedback

    // handle new feedback
    const handleReport = () => {
        router.push('report/')
    }
    // end of handle new feedback

    // handle respond
    const handleRespond = async(feedback_id, message) => {
      await AsyncStorage.setItem('message', message);
      await AsyncStorage.setItem('feedback_id', feedback_id);
      router.push('adminresponse/');
    }
    // end of handle respond

     // Alert component
  const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-green-800 p-3 rounded-lg">
        <Text className="text-white font-bold">You have 0 notifications</Text>
      </View>
    );
  };

    // feedback component
    const Feedback = ({feedback_id, created_at, title, message, category, user_id, onRespond}) => {
        return (
            <View className='w-full p-4 m-1 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>{created_at}</Text>
                    <Text className='font-bold text-green-800'>{title}</Text>
                    <TouchableOpacity onPress={() => onRespond(feedback_id, message)}><Text className='font-bold text-green-800'>Respond</Text></TouchableOpacity>
                </View>
                <Text className='m-3'>{message}</Text>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>Category: {category}</Text>
                    <Text className='font-bold text-green-800'>User ID: {user_id}</Text>
                </View>
            </View>
            
        );
    }
    // end of feedback component

    if (loading) {
        return <ActivityIndicator size="large" color="#2F6F3A" />;
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
          <ScrollView className="w-full">
        <View className="flex-1 bg-white justify-center items-center p-2 font-sans">
        {/* statistics part */}
        <View className='w-full m-2'>
        <Text className='text-lg font-bold'>Complaints Received vs Resolved</Text>

        <View className='mb-4 mt-4'>
        <Text className='text-lg font-bold'>Received</Text>
        <BarChart
        data={receivedData}
        width={Dimensions.get("window").width - 10} // Full width
        height={450}
        yAxisLabel=""
        yAxisSuffix=""
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
        verticalLabelRotation={125} // Rotate labels for better visibility
        fromZero={true} // Start from zero
        showValuesOnTopOfBars={true} // Show values on bars
      />
      </View>
      <View className='mb-4 mt-4'>
      <Text className='text-lg font-bold'>Resolved</Text>
        <BarChart
        data={resolvedData}
        width={Dimensions.get("window").width - 10} // Full width
        height={450}
        yAxisLabel=""
        yAxisSuffix=""
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
        verticalLabelRotation={125} // Rotate labels for better visibility
        fromZero={true} // Start from zero
        showValuesOnTopOfBars={true} // Show values on bars
      />
      </View>

      

        <TouchableOpacity className="w-full h-20 justify-center items-center bg-green-800 p-4 mb-8 rounded-lg" onPress={handleReport}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Report</Text> }
      </TouchableOpacity>
      </View>
      {/* end of statistics part */}

      
            {/* submitted feedbacks */}

            <Text className='w-full text-lg mt-5 font-bold'>Feedbacks</Text>
            {feedbacks.length == 0 ? (
            <Alert />
          ) : (
            <FlatList
              data={feedbacks}
              keyExtractor={(item) => item.feedback_id.toString()}
              renderItem={({ item }) => <Feedback feedback_id={item.feedback_id.toString()} created_at={item.created_at.split("T")[0]} title={item.title} status={item.status} message={item.message} category={item.category} user_id={item.user_id} onRespond={handleRespond} />}
              
            /> 
          )}
            {/* end of submitted feedbacks */}
            

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