import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationIcon(){
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => navigation.navigate('notifications')}
    >
      <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};
