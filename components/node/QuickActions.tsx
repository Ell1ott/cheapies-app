import { getIconColor } from "@/utils/themeColor";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, View } from "react-native";
import { rippleConfig } from "../rippleConfig";
import * as Sharing from "expo-sharing";
import { Share } from "react-native";
import { NodeInfo } from "@/utils/apiHandler/singleNodeParser";

export const QuickActions = ({
	nodeId,
	nodeInfo,
}: {
	nodeId: string;
	nodeInfo: NodeInfo;
}) => (
	<View className="flex flex-row gap-3">
		<QuickAction
			icon={faShareNodes}
			onPress={async () => {
				Share.share(
					{
						url: "https://www.cheapies.nz/node/" + nodeId,
						message: "https://www.cheapies.nz/node/" + nodeId,
						// message: nodeInfo.title,
						title: nodeInfo.title,
					},
					{}
				);
			}}
		></QuickAction>
		<QuickAction icon={faBookmark} onPress={() => {}}></QuickAction>
		<QuickAction icon={faShareNodes} onPress={() => {}}></QuickAction>
		<QuickAction icon={faBookmark} onPress={() => {}}></QuickAction>
	</View>
);

export const QuickAction = ({
	icon,
	onPress,
}: {
	icon: any;
	onPress: () => void;
}) => (
	<Pressable
		className="h-16 flex items-center justify-center rounded-md flex-1"
		onPress={onPress}
		android_ripple={rippleConfig}
	>
		<FontAwesomeIcon icon={icon} size={25} color={getIconColor()} />
	</Pressable>
);
