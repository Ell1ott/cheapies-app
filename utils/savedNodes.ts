import { Item } from "@/components/Nodes/NodeItem";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
	items: Item[];
	addItem: (item: Item) => void;
	removeItem: (nodeId: string) => void;
	clearItems: () => void;
}

export const useSavedNodesStore = create<StoreState>((set) => ({
	items: [],

	// Action to add an item
	addItem: (item: Item) =>
		set((state: StoreState) => ({
			items: [...state.items, item],
		})),

	// Action to remove an item by index or value
	removeItem: (nodeId: string) =>
		set((state: StoreState) => ({
			items: state.items.filter(({ nodeId }) => nodeId !== nodeId),
		})),

	// Action to clear all items
	clearItems: () => set({ items: [] }),
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
