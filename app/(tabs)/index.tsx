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
import { fetchData } from "@/utils/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faDownload,
	faDownLong,
	faPlus,
	faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Item, NodeItem } from "@/components/nodeitem";

const generateData = (count: number) => {
	const data = [];
	for (let i = 1; i <= count; i++) {
		data.push({
			id: i.toString(),
			title: `Item ${i}`,
		});
	}
	return data;
};

const DATA = generateData(20);

const sep = () => {
	return <View className="w-full h-[1px] bg-white/10"></View>;
};

const iconColor = "rgba(255, 255, 255, 0.6)";

export default function HomeScreen() {
	const [DATA, setDATA] = useState<Item[]>([]);

	const [category, setCategory] = useState("deals");

	useEffect(() => {
		fetchData(category).then((data) => {
			console.log(data);
			console.log(data[0].tags);
			setDATA(data);
		});
	}, [category]);

	return (
		<>
			<Header onCategoryChange={setCategory} />
			<ThemedView>
				<SafeAreaView>
					{DATA.length === 0 ? (
						<Text>Loading...</Text>
					) : (
						<SwipeListView
							data={DATA}
							renderItem={({ item }) => <NodeItem item={item} />}
							renderHiddenItem={(data, rowMap) => (
								<View>
									<Text>Left</Text>
									<Text>Right</Text>
								</View>
							)}
							keyExtractor={(item) => item.id}
							ItemSeparatorComponent={sep}
							leftOpenValue={75}
							rightOpenValue={-150}
							previewRowKey={"0"}
							previewOpenValue={-40}
							previewOpenDelay={3000}
						/>
					)}
				</SafeAreaView>
			</ThemedView>
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
