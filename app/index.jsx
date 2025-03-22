import { Text, View } from "react-native";
import '../global.css';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="bg-green-700">Welcome to complain and compliment digital feedback app..</Text>
    </View>
  );
}
