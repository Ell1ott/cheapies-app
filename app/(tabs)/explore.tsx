import { Text, StyleSheet, SafeAreaView, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";
import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header/header";
import { fetchData } from "@/utils/ApiHandler";

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

const tagColors = {
	expired: "bg-red-500",
	longrunning: "bg-slate-600",
};

const Item = ({ item }: { item: Item }) => (
	<Pressable android_ripple={rippleConfig} className="p-5 px-[1.5rem]">
		<Text>
			{item.tags.map((tag) => (
				<View
					className="h-full flex flex-1 mt-4 mr-2 rounded-full"
					key={tag.type}
				>
					<ThemedText
						className={
							"h-full flex-1 px-2 -mb-[5px] pb-[2px] mr-2 rounded-full capitalize " +
							tagColors[tag.type]
						}
					>
						{tag.text}
					</ThemedText>
				</View>
			))}

			<ThemedText className="font-semibold text-xl">{item.title}</ThemedText>
		</Text>
		<ThemedText className="">{item.description}</ThemedText>
	</Pressable>
);

const sep = () => {
	return <View className="w-full h-[1px] bg-white/10"></View>;
};

type Item = {
	id: string;
	title: string;
	description: string;
	tags: { type: keyof typeof tagColors; text: string }[];
};

const iconColor = "rgba(255, 255, 255, 0.6)";

export default function HomeScreen() {
	const [DATA, setDATA] = useState<Item[]>([]);

	useEffect(() => {
		fetchData().then((data) => {
			console.log(data);
			console.log(data[0].tags);
			setDATA(data);
		});
	}, []);

	return (
		<>
			<Header />
			<ThemedView>
				<SafeAreaView>
					{DATA.length === 0 ? (
						<Text>Loading...</Text>
					) : (
						<SwipeListView
							data={DATA}
							renderItem={({ item }) => <Item item={item} />}
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
		</>
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
