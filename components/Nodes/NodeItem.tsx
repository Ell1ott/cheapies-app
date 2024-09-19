import { Text, View, Pressable, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";
const rippleConfig = {
	color: "rgba(255, 255, 255, 0.1)", // Ripple color
	borderless: false, // Whether the ripple should be bounded or not
};

export type Item = {
	id: string;
	title: string;
	description: string | undefined;
	tags: { type: keyof typeof tagColors; text: string }[];
	image: string | undefined;
	upvotes: number;
	downvotes: number;
	url: string;
};

const tagColors = {
	expired: "bg-red-500",
	longrunning: "bg-slate-600",
	upcoming: "bg-blue-500",
	event: "bg-indigo-800",
	poll: "bg-green-700",
	resolved: "bg-green-500",
};

const ItemWithImage = ({ item }: { item: Item }) => (
	<Pressable
		className="flex flex-row gap-1 p-5 px-[1.5rem] bg-neutral-900"
		android_ripple={rippleConfig}
	>
		<View className="flex-1">
			<ItemContent item={item} />
		</View>
		<View className="max-w-[5.5rem] w-[6rem] pt-2">
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
						<FontAwesomeIcon
							icon={faUpLong}
							color="#4ade80"
							size={20}
							style={{ opacity: 0.9 }}
						/>
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

export const NodeItem = ({ item }: { item: Item }) => {
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
