import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";
import { Item, NodeItem } from "./NodeItem";
import { useEffect } from "react";
import React, { useState } from "react";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { fetchRoot } from "@/utils/apiHandler/dataFetcher";

const sep = () => {
	return <View className="w-full h-[1px] bg-white/10"></View>;
};

export const NodeList = ({ category }: { category: string }) => {
	let listRef: any = null;
	const [items, setData] = React.useState<Item[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [showLoading, setShowLoading] = useState(true);
	const [currentlyLoading, setCurrentlyLoading] = useState(false);

	useEffect(() => {
		setCurrentPage(0);
		fetchRoot(category).then((root) => {
			getNodeList(root, category).then((data) => {
				setData(data);
			});
		});
	}, [category]);

	useEffect(() => {
		// console.log("scrolling to top", listRef);
		if (listRef)
			listRef.scrollToOffset({
				animated: true,
				offset: 0,
			});
	}, [items, listRef]);

	const loadMoreData = async () => {
		if (currentlyLoading) return;
		setCurrentlyLoading(true);
		console.log("fetching next page");
		const root = await fetchRoot(category + "?page=" + (currentPage + 1));
		getNodeList(root, category).then((data) => {
			if (data.length === 0) {
				setShowLoading(false);
				console.log("no more data");
				setCurrentlyLoading(false);
				return;
			}
			
			setCurrentPage(currentPage + 1);
			setData([...items, ...data]);
		});
		
		setCurrentlyLoading(false);
	};

	return (
		<ThemedView className="flex-1">
			{/* <View className="bg-red-500 flex-1"></View> */}
			<SafeAreaView>
				{items.length === 0 ? (
					<Text>Loading...</Text>
				) : (
					<SwipeListView
						onEndReached={loadMoreData}
						listViewRef={(ref) => (listRef = ref)}
						data={items}
						ListFooterComponent={showLoading ? loadingItemsItem : null}

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
};

const loadingItemsItem = () => 
	(
		<View className="w-full justify-center h-20  items-center border-t border-white/10">
			<ActivityIndicator size="large" color="#dddddd" />
		</View>
	);

