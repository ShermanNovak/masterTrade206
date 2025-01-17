import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Message = ({ message, time, isSent }) => {
  // Format the time to display properly
  const messageTime = time.toDate();
  const formattedTime = messageTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.item} className={`bg-white p-2 rounded-lg ${isSent ? 'self-end bg-purple-300' : 'self-start bg-purple-100'}`}>
      <Text className={`text-black`}>{message}</Text>
      <Text className={`text-xs text-gray-500 mt-1 ${isSent ? 'self-start' : 'self-end'}`}>{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
  },
});

export default Message;
