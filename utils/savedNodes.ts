import { Item } from "@/components/Nodes/NodeItem";
import { create } from "zustand";

interface StoreState {
	items: Item[];
	addItem: (item: Item) => void;
	removeItem: (nodeId: string) => void;
	clearItems: () => void;
}

const useStore = create<StoreState>((set) => ({
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

useStore.subscribe(console.log);

export default useStore;
