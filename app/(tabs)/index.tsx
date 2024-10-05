import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header/header";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { Item } from "@/components/Nodes/NodeItem";
import { DropdownComponent } from "@/components/navigation/header/headDropdown";
import { NodeList } from "@/components/Nodes/NodeList";
import { Text } from "react-native";
import { Stack } from "expo-router";

const iconColor = "rgba(255, 255, 255, 0.6)";

export default function HomeScreen() {
	const [data, setData] = useState<Item[]>([]);

	const [category, setCategory] = useState("deals");

	useEffect(() => {
		getNodeList(category).then((data) => {
			setData(data);
		});
	}, [category]);

	return (
		<>
			<Stack.Screen
				options={{ headerTitle: "hii", title: "hi", headerShown: false }}
			></Stack.Screen>
			<Header>
				<DropdownComponent onCategoryChange={setCategory} />
			</Header>
			<NodeList items={data} />
			<Text></Text>
		</>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
