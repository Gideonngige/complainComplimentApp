import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { useRouter } from "expo-router";
import axios from 'axios';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

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
    const [reportTime, setReportTime] = useState("");

    const [academicComplains, setAcademicComplains] = useState(0);
    const [academicCompliments, setAcademicCompliments] = useState(0);
    const [healthComplains, setHealthComplains] = useState(0);
    const [healthCompliments, setHealthCompliments] = useState(0);
    const [adminComplains, setAdminComplains] = useState(0);
    const [adminCompliments, setAdminCompliments] = useState(0);
    const [ictComplains, setIctComplains] = useState(0);
    const [ictCompliments, setIctCompliments] = useState(0);
    const [studentComplains, setStudentComplains] = useState(0);
    const [studentCompliments, setStudentCompliments] = useState(0);
    const [maintenanceComplains, setMaintenanceComplains] = useState(0);
    const [maintenanceCompliments, setMaintenanceCompliments] = useState(0);

  
  // start of calling api to get pie chart data
  useEffect(() => {
    const fetchData = async() =>{
      setIsLoading(true);
      try{
        const url = `https://complaincomplimentbackend.onrender.com/countdepartmentfeedbacks/`;
        const response = await axios.get(url);
        if(response.status === 200){
          setAcademicComplains(response.data.total_acc);
          setAcademicCompliments(response.data.total_ac);
          setHealthComplains(response.data.total_hc);
          setHealthCompliments(response.data.total_h);
          setAdminComplains(response.data.total_adc);
          setAdminCompliments(response.data.total_ad)
          setIctComplains(response.data.total_ic);
          setIctCompliments(response.data.total_i);
          setStudentComplains(response.data.total_sc);
          setStudentCompliments(response.data.total_s)
          setMaintenanceComplains(response.data.total_mc);
          setMaintenanceCompliments(response.data.total_m);
          const date = new Date();
          setReportDate(date.toLocaleDateString());
          setReportTime(date.toLocaleTimeString());
          const newReport = `The following is a report of ${reportDate} on the complaints and compliments received by each department. The number of complains and compliments received this month for academics, administration, health and wellness, maintenance and environment, student services, and ict are represented in the following pie charts.`;
          setReport(newReport);
          
        }
        else{
          Toast.show({
            type: "error", // Can be "success", "error", "info"
            text1: "Error",
            text2: "An error occurred",
            });
        }

      }
      catch(error){
        alert(error)
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "Error",
          text2: error,
          });
      }
      finally{
        setIsLoading(false)
      }

    }
    fetchData();
  }, []);
  // end of calling api to get pie chart data

const screenWidth = Dimensions.get("window").width;

// data complains
const chartDataComplains = [
  {
    name: "Academics",
    count: academicComplains,
    color: "#f87171",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "Health",
    count: healthComplains,
    color: "#facc15",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "Administration",
    count: adminComplains,
    color: "#34d399",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "ICT",
    count: ictComplains,
    color: "#60a5fa",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "Student services",
    count: studentComplains,
    color: "#FF0000",
    legendFontColor: "#333",
    legendFontSize: 11
  },
  {
    name: "Maintenance",
    count: maintenanceComplains,
    color: "#00FF00",
    legendFontColor: "#333",
    legendFontSize: 12
  }
];
// data

// data complains
const chartDataCompliments = [
  {
    name: "Academics",
    count: academicCompliments,
    color: "#f87171",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "Health",
    count: healthCompliments,
    color: "#facc15",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "Administration",
    count: adminCompliments,
    color: "#34d399",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "ICT",
    count: ictCompliments,
    color: "#60a5fa",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "Student services",
    count: studentCompliments,
    color: "#FF0000",
    legendFontColor: "#333",
    legendFontSize: 11
  },
  {
    name: "Maintenance",
    count: maintenanceCompliments,
    color: "#00FF00",
    legendFontColor: "#333",
    legendFontSize: 12
  }
];
// data

    if (isLoading) {
        return <ActivityIndicator size="large" color="#2F6F3A" />;
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-2 font-sans">
            <View className='w-full bg-green-800 justify-center items-center h-20'>
                <Text className="p-4 text-lg font-bold text-white">Report on complaints and compliments</Text>
            </View>

            {/* start of report */}
            <View className='w-full p-4 m-2 mb-8 bg-white rounded-lg shadow-sm'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold text-green-800'>{reportDate}</Text>
                    <Text className='font-bold text-green-800'>{reportTime}</Text>
                </View>
                <Text className='m-3'>{report}</Text>

            </View>
{/* start of complaints report */}
<View
  style={{
    width: screenWidth - 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  }}
>
    <Text className='font-bold text-lg'>Complaints</Text>
  <PieChart
    data={chartDataComplains}
    width={screenWidth - 60} // Reduce width a bit for padding
    height={200}
    chartConfig={{
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }}
    accessor="count"
    backgroundColor="transparent"
    paddingLeft="15" // Helps center the chart
    absolute
    // hasLegend: true by default
  />
</View>
{/* end of complaints part */}

{/* start compliment report */}
<View
  style={{
    width: screenWidth - 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  }}
>
    <Text className='font-bold text-lg'>Compliments</Text>
  <PieChart
    data={chartDataCompliments}
    width={screenWidth - 60} // Reduce width a bit for padding
    height={200}
    chartConfig={{
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }}
    accessor="count"
    backgroundColor="transparent"
    paddingLeft="15" // Helps center the chart
    absolute
    // hasLegend: true by default
  />
</View>
<Toast/>
{/* end of compliment report */}

            {/* end of report */}

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