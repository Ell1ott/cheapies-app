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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faBars,
	faChevronDown,
	faMagnifyingGlass,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SwipeListView } from "react-native-swipe-list-view";
import { Dropdown } from "react-native-element-dropdown";
import HTMLparser from "fast-html-parser";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

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

const fetchData = async () => {
	const response = await fetch("https://www.cheapies.nz/cat/education");
	const html = await response.text();
	const root = HTMLparser.parse(html);
	const items = root.querySelectorAll(".title");
	let descriptons = root.querySelectorAll("dd p");
	if (descriptons.length === 0) descriptons = root.querySelectorAll(".content");
	console.log(items.length);
	console.log(items.length);

	let currentId = 0;

	return items.map((item, index) => {
		currentId++;
		const title = item.childNodes.find((node) => node.tagName === "a");
		console.log(descriptons);
		console.log(title);
		return {
			title: title?.text,
			id: currentId + "",
			tags: item
				.querySelectorAll(".tagger")
				.map((tag) => ({ type: tag.classNames[1], text: tag.text })),
			description: descriptons[index].text
				.replace(/(\r\n|\n|\r)/gm, " ")
				.replace(/\s{2,}/g, " "),
		};
	});
};

const iconColor = "rgba(255, 255, 255, 0.6)";

const dropDownData = [
	{ label: "Deals", value: "deals" },
	{ label: "Vouchers", value: "vouchers" },
	{ label: "Freebies", value: "freebies" },
	{ label: "Comps", value: "competitions" },
];

const DropdownComponent = () => {
	const [value, setValue] = useState<string | null>("deals");
	const [isFocus, setIsFocus] = useState(false);

	const renderLabel = () => {
		if (value || isFocus) {
			return <Text style={isFocus && { color: "blue" }}></Text>;
		}
		return null;
	};

	const backgroundColor = useThemeColor(
		{ light: Colors.light.background, dark: Colors.dark.background },
		"background"
	);

	return (
		<View className="flex-1">
			<Dropdown
				style={{
					overflow: "visible",
					width: 200,
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "center",
				}}
				containerStyle={{
					width: 200,
					backgroundColor: "hsl(360, 0%, 20%)",
					borderColor: "transparent",
					marginTop: 10,
				}}
				activeColor="hsl(360, 0%, 30%)"
				itemTextStyle={{ color: "white", width: "auto", overflow: "visible" }}
				data={dropDownData}
				selectedTextStyle={{
					color: "white",

					width: "auto",
					fontSize: 18,
					overflow: "visible",
					flex: 0,
				}}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? "Select item" : "..."}
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setValue(item.value);
					setIsFocus(false);
				}}
			/>
		</View>
	);
};

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
			<View className="flex flex-row gap-4 p-4 pt-12 px-[1.5rem] bg-neutral-800 items-center">
				<FontAwesomeIcon
					icon={faBars}
					size={23}
					color="rgba(255, 255, 255, 0.6)"
				/>
				<DropdownComponent />
				{/* <Pressable className="flex flex-row items-center gap-1.5">
					<ThemedText className="text-xl">Deals</ThemedText>
					<FontAwesomeIcon
						size={12}
						icon={faChevronDown}
						color={iconColor}
					></FontAwesomeIcon>
				</Pressable> */}
				<View className="flex-1"></View>
				<View className="aspect-square bg-neutral-500 self-stretch pt-[7px] pl-[3.5px] rounded-full overflow-hidden">
					<FontAwesomeIcon
						icon={faUser}
						size={20}
						color="rgba(255, 255, 255, 0.6)"
					/>
				</View>
			</View>
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
