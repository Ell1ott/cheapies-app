import {
	Text,
	StyleSheet,
	SafeAreaView,
	View,
	Pressable,
	Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";
import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header/header";
import { fetchData, getNodeList } from "@/utils/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faDownload,
	faDownLong,
	faPlus,
	faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Item, NodeItem } from "@/components/Nodes/NodeItem";
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
