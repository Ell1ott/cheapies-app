import { Item } from "@/components/Nodes/NodeItem";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NodeInfo } from "./apiHandler/singleNodeParser";
import { HTMLElement, parse } from "fast-html-parser";
const loadState = async () => {
	try {
		const jsonState = await AsyncStorage.getItem("@saved_nodes");
		if (jsonState !== null) {
			const jsonData: Record<string, NodeInfo> = JSON.parse(jsonState);
			for (const key in jsonData) {
				console.log("key " + key);
				console.log(jsonData[key].titleElements);
				jsonData[key].titleElements.map((element) =>
					Object.assign(parse(""), element)
				);

				console.log("feff" + typeof jsonData[key].titleElements[0]);
				// if (jsonData.hasOwnProperty(key)) {
				// 	jsonData[key].titleElements.map((element) => {
				// 		Object.assign(new HTMLElement(), element);
				// 	});
				// }
			}

			useSavedNodesStore.setState({ items: jsonData });
		}
	} catch (e) {
		console.error(e);
	}
};

loadState();

interface StoreState {
	items: Record<string, NodeInfo>;
	addItem: (item: NodeInfo) => void;
	removeItem: (nodeId: string) => void;
	clearItems: () => void;
}

export const useSavedNodesStore = create<StoreState>((set) => ({
	items: {},

	// Action to add an item
	addItem: (item: NodeInfo) =>
		set((state: StoreState) => {
			const newItems = { ...state.items, [item.id]: item };
			return { items: newItems };
		}),

	// Action to remove an item by index or value
	removeItem: (nodeId: string) =>
		set((state: StoreState) => {
			const { [nodeId]: _, ...newItems } = state.items;
			return { items: newItems };
		}),

	// Action to clear all items
	clearItems: () => set({ items: {} }),
}));

useSavedNodesStore.subscribe(async (state) => {
	try {
		const jsonState = JSON.stringify(state.items);
		await AsyncStorage.setItem("@saved_nodes", jsonState);
	} catch (e) {
		console.error(e);
	}
});

export default useSavedNodesStore;
