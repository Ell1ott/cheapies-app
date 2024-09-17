import {
	Text,
	StyleSheet,
	SafeAreaView,
	View,
	Pressable,
	Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";
import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header/header";
import { fetchData } from "@/utils/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faDownload,
	faDownLong,
	faPlus,
	faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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

const ItemWithImage = ({ item }: { item: Item }) => (
	<Pressable
		className="flex flex-row gap-2 p-5 px-[1.5rem] bg-neutral-900"
		android_ripple={rippleConfig}
	>
		<View className="flex-1">
			<ItemContent item={item} />
		</View>
		<View className="max-w-[5.5rem] w-[6rem]">
			<Image
				source={{ uri: item.image }}
				className="aspect-square rounded-lg overflow-hidden"
			/>
			<View className="mt-3">
				{item.upvotes != 0 && (
					<View className="flex items-center justify-center flex-row">
						<ThemedText className="font-bold text-2xl text-white">
							{item.upvotes}
						</ThemedText>
						<FontAwesomeIcon icon={faUpLong} color="#4ade80" size={20} />
					</View>
				)}
				{item.downvotes != 0 && (
					<View className="flex items-center justify-center flex-row">
						<ThemedText className="font-bold text-2xl text-white">
							{item.downvotes}
						</ThemedText>
						<FontAwesomeIcon icon={faDownLong} color="#ef4444" size={20} />
					</View>
				)}
			</View>
		</View>
	</Pressable>
);

const Item = ({ item }: { item: Item }) => {
	return item.image ? (
		<ItemWithImage item={item} />
	) : (
		<SimpleItem item={item} />
	);
};

const SimpleItem = ({ item }: { item: Item }) => (
	<Pressable
		android_ripple={rippleConfig}
		className="p-5 px-[1.5rem] bg-neutral-900"
	>
		<ItemContent item={item} />
	</Pressable>
);

const ItemContent = ({ item }: { item: Item }) => (
	<>
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
		{item.description && (
			<ThemedText className="">{item.description}</ThemedText>
		)}
	</>
);

const sep = () => {
	return <View className="w-full h-[1px] bg-white/10"></View>;
};

type Item = {
	id: string;
	title: string;
	description: string;
	tags: { type: keyof typeof tagColors; text: string }[];
	image: string;
	upvotes: number;
	downvotes: number;
};

const iconColor = "rgba(255, 255, 255, 0.6)";

export default function HomeScreen() {
	const [DATA, setDATA] = useState<Item[]>([]);

	const [category, setCategory] = useState("deals");

	useEffect(() => {
		fetchData(category).then((data) => {
			console.log(data);
			console.log(data[0].tags);
			setDATA(data);
		});
	}, [category]);

	return (
		<>
			<Header onCategoryChange={setCategory} />
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
