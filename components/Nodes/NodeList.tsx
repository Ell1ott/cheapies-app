import { SafeAreaView, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";
import { Item, NodeItem } from "./NodeItem";

const sep = () => {
	return <View className="w-full h-[1px] bg-white/10"></View>;
};

export const NodeList = ({ items }: { items: Item[] }) => (
	<ThemedView>
		<SafeAreaView>
			{items.length === 0 ? (
				<Text>Loading...</Text>
			) : (
				<SwipeListView
					data={items}
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
);
