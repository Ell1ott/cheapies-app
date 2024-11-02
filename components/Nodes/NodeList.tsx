import { SafeAreaView, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";
import { type Item, NodeItem } from "./NodeItem";
import { Separator } from "./Separator";
import React from "react";
export const NodeList = ({
	items,
	...props
}: { items: Item[] } & SwipeListView<Item>["props"]) => (
	<ThemedView className="flex-1">
		{/* <View className="bg-red-500 flex-1"></View> */}
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
					ItemSeparatorComponent={Separator}
					leftOpenValue={75}
					rightOpenValue={-150}
					previewRowKey={"0"}
					previewOpenValue={-40}
					previewOpenDelay={3000}
					{...props}
				/>
			)}
		</SafeAreaView>
	</ThemedView>
);
