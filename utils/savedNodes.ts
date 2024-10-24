import AsyncStorage from "@react-native-async-storage/async-storage";
export function saveNode(nodeId: string) {
	savedNodes.push(nodeId);
	saveSavedNotesToStorage();
}
export function unsaveNode(nodeId: string) {
	savedNodes = savedNodes.filter((id) => id !== nodeId);
	saveSavedNotesToStorage();
}

let savedNodes: string[] = [];
// Function to save posts
const saveSavedNotesToStorage = async () => {
	try {
		const jsonValue = JSON.stringify(savedNodes);
		await AsyncStorage.setItem("@saved_posts", jsonValue);
		console.log("Posts saved to disk");
	} catch (error) {
		console.log("Error saving posts:", error);
	}
};
