import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header/header";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { Item } from "@/components/Nodes/NodeItem";
import { DropdownComponent } from "@/components/navigation/header/headDropdown";
import { NodeList } from "@/components/Nodes/NodeList";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { Stack } from "expo-router";

import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
export default function HomeScreen() {
	const [data, setData] = useState<Item[]>([]);

	const [category, setCategory] = useState("deals");
	const [subCategory, setSubCategory] = useState("x");
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<Header>
				<DropdownComponent onCategoryChange={setCategory} />
				<Pressable onPress={() => setModalVisible(true)}>
					<ThemedText className="font-medium text-lg">Category</ThemedText>
					<Modal
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
							setModalVisible(!modalVisible);
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>Hello World!</Text>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}
								>
									<Text style={styles.textStyle}>Hide Modal</Text>
								</Pressable>
							</View>
						</View>
					</Modal>
				</Pressable>
			</Header>
			<NodeList category={category} />
		</>
	);
}
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
