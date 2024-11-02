import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header/header";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { Item } from "@/components/Nodes/NodeItem";
import { DropdownComponent } from "@/components/navigation/header/headDropdown";
import { DynamicNodeList } from "@/components/Nodes/DynamicNodeList";
import { Text } from "react-native";
import { Stack } from "expo-router";

export default function HomeScreen() {
	const [data, setData] = useState<Item[]>([]);

	const [category, setCategory] = useState("deals");

	return (
		<>
			<Header>
				<DropdownComponent onCategoryChange={setCategory} />
			</Header>
			<DynamicNodeList category={category} />
		</>
	);
}
