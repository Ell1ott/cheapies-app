import { TitleRenderer } from "@/components/Nodes/NodeItem";
import { NodeScreenContent } from "@/components/Nodes/NodeScreenContent";
import { ThemedText } from "@/components/ThemedText";
import { getNodeInfo, NodeInfo } from "@/utils/apiHandler/singleNodeParser";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, ScrollView, Image } from "react-native";

export default function Page() {
	const local = useLocalSearchParams();
	console.log(local);
	const [nodeInfo, setNodeInfo] = React.useState<NodeInfo | null>(null);
	const [imgAspectRation, setImgAspectRatio] = React.useState(1);

	useEffect(() => {
		getNodeInfo(local.node).then((data) => {
			setNodeInfo(data);
			Image.getSize(data.image, (width, height) => {
				console.log(width, height);
				setImgAspectRatio(Math.max(Math.min(width / height, 3), 1));
			});
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
				<ScrollView>
					<View className="p-4">
						<ThemedText className="text-2xl font-bold mb-2">
							{TitleRenderer(nodeInfo.titleElements)}
						</ThemedText>
						<Image
							source={{ uri: nodeInfo.image }}
							className="overflow-hidden mb-3 w-full rounded-lg bg-white"
							style={{
								aspectRatio: imgAspectRation,
								resizeMode: imgAspectRation > 1 ? "contain" : "cover",
							}}
						/>
						<NodeScreenContent elem={nodeInfo.descriptionElement} />
					</View>
				</ScrollView>
			)}
		</View>
	);
}
