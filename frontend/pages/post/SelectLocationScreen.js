import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import Button from "../../components/Button";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { axiosInstance } from "../../services/axios";

const SelectLocationScreen = ({ navigation, route }) => {
    const issue = route.params;

    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");

    const getUserId = async () => {
        try {
            const response = await getItemAsync("userId");
            console.log(response);
            return response;
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getUserId();
    }, []);

    // TODO: I THINK THIS IS WRONG OOPS
    const postIssue = async () => {
        try {
            const response = await axiosInstance.post("/api/issue");
            await setItemAsync("userId", response.data.userId);
            console.log("i submitted issue:", response.data.title);
        } catch (error) {
            console.error(error);
        }
    };

    const saveLocation = () => {
        if (country !== "" && postalCode !== "" && address !== "") {
            const updatedIssue = {
                ...issue,
                address: `${country}:${postalCode}:${address}`,
            };
            console.log(updatedIssue);
            Alert.alert("Complete!");
            // TODO: we need to send this issue to the backend now
            postIssue();
            navigation.navigate("YourPostsScreen");
            return;
        }

        let message = "Following fields cannot be empty: \n";
        if (!country) message += "Country\n";
        if (!postalCode) message += "Postal Code\n";
        if (!address) message += "Address\n";

        Alert.alert(message);

        Alert.alert("" + message);
    };

    const onChangeCountry = (country) => {
        setCountry(country);
    };

    const onChangePostalCode = (postalCode) => {
        setPostalCode(postalCode);
    };

    const onChangeAddress = (address) => {
        setAddress(address);
    };

    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 5 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                Where is the issue located?
            </Text>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    <Text className="pb-2 pt-4">Country</Text>
                    <TextInput
                        value={country}
                        placeholder="eg. Singapore"
                        onChangeText={onChangeCountry}
                    />

                    <Text className="pb-2 pt-4">Postal Code</Text>
                    <TextInput
                        value={postalCode}
                        placeholder="eg. 266913"
                        onChangeText={onChangePostalCode}
                    />

                    <Text className="pb-2 pt-4">Address</Text>
                    <TextInput
                        value={address}
                        placeholder="eg. Blk 123 Hello Ave 100 #12-3456"
                        onChangeText={onChangeAddress}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Button text="Confirm Location" onPress={saveLocation} />
        </View>
    );
};

export default SelectLocationScreen;
