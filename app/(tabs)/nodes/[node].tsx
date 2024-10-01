import { Header } from "@/components/navigation/header/header";
import { ThemedText } from "@/components/ThemedText";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const iconColor = "rgba(255, 255, 255, 0.6)";

export default function Page() {
	const local = useLocalSearchParams();
	console.log(local);
	return (
		<View>
			<Stack.Screen
				options={{
					title: "red",
				}}
			></Stack.Screen>
			<ThemedText>Page</ThemedText>
		</View>
	);
}
