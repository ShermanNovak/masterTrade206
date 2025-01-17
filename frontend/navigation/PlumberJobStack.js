import { createStackNavigator } from "@react-navigation/stack";
import PlumberPostsPage from "../pages/plumber/PlumberPostsPage";
import PlumberJobDetailsPage from "../pages/plumber/PlumberJobDetailsPage";
import ChatPage from '../pages/chat/ChatPage';

const Stack = createStackNavigator();

export default function PlumberJobStack() {
  return (
    <Stack.Navigator
      initialRouteName="PlumberPostsPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PlumberPostsPage" component={PlumberPostsPage} />
      <Stack.Screen name="PlumberJobDetailsPage" component={PlumberJobDetailsPage} />
      <Stack.Screen name="ChatPage" component={ChatPage} />
    </Stack.Navigator>
  );
}
