import {
	Text,
	Image,
	StyleSheet,
	Platform,
	SafeAreaView,
	ScrollView,
	FlatList,
	View,
	Touchable,
	TouchableOpacity,
	Pressable,
	TouchableHighlight,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";

const generateData = (count: number) => {
	const data = [];
	for (let i = 1; i <= count; i++) {
		data.push({
			id: i.toString(),
			title: `Item ${i}`,
		});
	}
	return data;
};

const DATA = generateData(20);
const rippleConfig = {
	color: "rgba(255, 255, 255, 0.1)", // Ripple color
	borderless: false, // Whether the ripple should be bounded or not
};

const Item = ({ title }: { title: string }) => (
	<Pressable android_ripple={rippleConfig} className="p-5 px-[1.5rem]">
		<ThemedText className="font-semibold text-2xl text-red-500">
			{title}
		</ThemedText>
		<ThemedText className="text-xl">This is my own Page</ThemedText>
	</Pressable>
);

const sep = () => {
	return <View className="w-full h-[1px] bg-white/10"></View>;
};

export default function HomeScreen() {
	return (
		<ThemedView>
			<SafeAreaView>
				<FlatList
					className="py-[2rem] pb-[10rem]"
					data={DATA}
					renderItem={({ item }) => <Item title={item.title} />}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={sep}
				/>
			</SafeAreaView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
