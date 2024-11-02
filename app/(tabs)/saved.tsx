import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Header } from "@/components/navigation/header/header";
import useSavedNodesStore from "@/utils/savedNodes";
import { NodeList } from "@/components/Nodes/NodeList";
import { useEffect } from "react";
import { NodeInfo } from "@/utils/apiHandler/singleNodeParser";

export default function HomeScreen() {
	const savedNodes: Record<string, NodeInfo> = useSavedNodesStore(
		(state) => state.items
	);
	useSavedNodesStore.subscribe(console.log);

	useEffect(() => {
		console.log("Saved Nodes:");
		console.log(savedNodes);
	});
	return (
		<>
			<Header>
				<ThemedText className="font-semibold text-xl">Saved Deals</ThemedText>
			</Header>

			<NodeList
				items={Object.values(savedNodes).map((n) => ({
					...n,
					commentCount: 0,
					tags: [],
					description:
						n.description
							.replace(/\n/g, " ")
							.replace(/\s+/g, " ")
							.trim()
							.substring(0, 150) + (n.description.length > 100 ? " ..." : ""),
				}))}
			/>
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
