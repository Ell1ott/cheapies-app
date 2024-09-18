import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header/header";
import { getNodeList } from "@/utils/apiHandler";
import { Item } from "@/components/Nodes/NodeItem";
import { DropdownComponent } from "@/components/navigation/header/headDropdown";
import { NodeList } from "@/components/Nodes/NodeList";

const iconColor = "rgba(255, 255, 255, 0.6)";

export default function HomeScreen() {
	const [DATA, setDATA] = useState<Item[]>([]);

	const [category, setCategory] = useState("deals");

	useEffect(() => {
		getNodeList(category).then((data) => {
			console.log(data);
			console.log(data[0].tags);
			setDATA(data);
		});
	}, [category]);

	return (
		<>
			<Header>
				<DropdownComponent onCategoryChange={setCategory} />
			</Header>
			<NodeList items={DATA} />
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
