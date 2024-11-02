import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";
import { type Item } from "./NodeItem";
import { useEffect } from "react";
import React, { useState } from "react";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { fetchRoot } from "@/utils/apiHandler/dataFetcher";
import { NodeList } from "./NodeList";

export const DynamicNodeList = ({ category }: { category: string }) => {
	let listRef: any = null;
	const [items, setData] = React.useState<Item[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [showLoading, setShowLoading] = useState(true);
	const [currentlyLoading, setCurrentlyLoading] = useState(false);

	useEffect(() => {
		setCurrentPage(0);
		fetchRoot(category).then((root) => {
			setData(getNodeList(root, category));
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

		const startTime = performance.now();

		const root = await fetchRoot(category + "?page=" + (currentPage + 1));

		const data = getNodeList(root, category);
		if (data.length === 0) {
			setShowLoading(false);
			console.log("no more data");
			setCurrentlyLoading(false);
			return;
		}

		setCurrentPage(currentPage + 1);
		const newData = [...items, ...data];
		const middleTime = performance.now();
		setData(newData);
		const endTime = performance.now();
		const duration1 = middleTime - startTime;
		const duration2 = endTime - middleTime;

		setCurrentlyLoading(false);
	};

	return (
		<NodeList
			items={items}
			listViewRef={(ref) => (listRef = ref)}
			ListFooterComponent={showLoading ? loadingItemsItem : null}
			onEndReached={loadMoreData}
		></NodeList>
	);
};

const loadingItemsItem = () => (
	<View className="w-full justify-center h-20  items-center border-t border-white/10">
		<ActivityIndicator size="large" color="#dddddd" />
	</View>
);
