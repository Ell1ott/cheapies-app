import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header/header";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { Item } from "@/components/Nodes/NodeItem";
import { DropdownComponent } from "@/components/navigation/header/headDropdown";
import { NodeList } from "@/components/Nodes/NodeList";
import { Text } from "react-native";
import { Stack } from "expo-router";

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
		</>
	);
}
