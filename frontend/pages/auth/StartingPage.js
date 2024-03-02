import { SafeAreaView, View, Text, ImageBackground } from "react-native";
import PurpleButton from "../../components/PurpleButton";
import Logo from "../../components/Logo";

export default StartingPage = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ImageBackground
        className="h-full flex flex-col justify-between"
        source={require("../../assets/gold_pipes.png")}
      >
        <Logo />
        <View className="flex flex-col gap-y-5">
          <Text className="text-white text-5xl font-extrabold">
            Plumbing Services, Simplified
          </Text>
          <Text className="text-white">
            Connecting you to skilled plumbers, with expert convenience at your
            doorstep
          </Text>
          <PurpleButton text="Get Started" onPress={navigation.push('AuthScreen')} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};