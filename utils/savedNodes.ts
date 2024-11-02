import { Item } from "@/components/Nodes/NodeItem";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NodeInfo } from "./apiHandler/singleNodeParser";
const loadState = async () => {
	try {
		const jsonState = await AsyncStorage.getItem("@app_state");
		if (jsonState !== null) {
			useSavedNodesStore.setState(JSON.parse(jsonState));
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

useSavedNodesStore.subscribe(console.log);

useSavedNodesStore.subscribe(async (state) => {
	try {
		const jsonState = JSON.stringify(state);
		await AsyncStorage.setItem("@saved_nodes", jsonState);
	} catch (e) {
		console.error(e);
	}
});

export default useSavedNodesStore;
