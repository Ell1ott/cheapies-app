import { QuickActions } from "@/components/node/QuickActions";
import { TitleRenderer } from "@/components/Nodes/NodeItem";
import { Separator } from "@/components/Nodes/DynamicNodeList";
import { NodeScreenContent } from "@/components/Nodes/NodeScreenContent";
import { ThemedText } from "@/components/ThemedText";
import { getNodeInfo, NodeInfo } from "@/utils/apiHandler/singleNodeParser";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, Pressable, Linking } from "react-native";

export default function Page() {
	const local = useLocalSearchParams();
	const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);
	const [imgAspectRatio, setImgAspectRatio] = useState(1);

	useEffect(() => {
		getNodeInfo(local.node as string).then((data) => {
			setNodeInfo(data);
			Image.getSize(data.image, (width, height) => {
				setImgAspectRatio(Math.max(Math.min(width / height, 3), 1));
			});
		});
	}, [local.node]);

	return (
		<View>
			<Stack.Screen options={{ title: "red" }} />
			{nodeInfo && (
				<ScrollView>
					<View className="p-4 pt-10">
						<ThemedText className="text-2xl font-bold mb-2">
							{TitleRenderer(nodeInfo.titleElements)}
						</ThemedText>
						{!nodeInfo.image.startsWith(
							"https://files.delvu.com/defaults/default.jpg"
						) && (
							<Pressable onPress={() => Linking.openURL(nodeInfo.storeURL)}>
								<Image
									source={{ uri: nodeInfo.image }}
									className="overflow-hidden mb-3 w-full rounded-lg bg-white"
									style={{
										aspectRatio: imgAspectRatio,
										resizeMode: imgAspectRatio > 1 ? "contain" : "cover",
									}}
								/>
							</Pressable>
						)}
						<NodeScreenContent elem={nodeInfo.descriptionElement} />
						<Separator className="-mx-4 my-7" />
						<QuickActions nodeId={local.node as string} nodeInfo={nodeInfo} />
					</View>
				</ScrollView>
			)}
		</View>
	);
}
