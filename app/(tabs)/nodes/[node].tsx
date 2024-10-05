import { Header } from "@/components/navigation/header/header";
import { TitleRenderer } from "@/components/Nodes/NodeItem";
import { NodeScreenContent } from "@/components/Nodes/NodeScreenContent";
import { ThemedText } from "@/components/ThemedText";
import { getNodeInfo, NodeInfo } from "@/utils/apiHandler/singleNodeParser";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

const iconColor = "rgba(255, 255, 255, 0.6)";

export default function Page() {
	const local = useLocalSearchParams();
	console.log(local);
	const [nodeInfo, setNodeInfo] = React.useState<NodeInfo | null>(null);

	useEffect(() => {
		getNodeInfo("48615").then((data) => {
			setNodeInfo(data);
		});
	}, []);
	return (
		<View>
			<Stack.Screen
				options={{
					title: "red",
				}}
			></Stack.Screen>
			{nodeInfo && (
				<ScrollView className="p-4">
					<ThemedText className="text-3xl font-bold">
						{TitleRenderer(nodeInfo.titleElements)}
					</ThemedText>
					<NodeScreenContent elem={nodeInfo.descriptionElement} />
				</ScrollView>
			)}
		</View>
	);
}
