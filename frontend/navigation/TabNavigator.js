import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../pages/chat/ChatPage"
import ReviewScreen from "../pages/review/ReviewPage"
import PostScreen from "../pages/post/PostPage"

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Review" component={ReviewScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
    </Tab.Navigator>
  );
}