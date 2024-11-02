import { getIconColor } from "@/utils/themeColor";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, View } from "react-native";
import { rippleConfig } from "../rippleConfig";
import * as Sharing from "expo-sharing";
import { Share } from "react-native";
import { NodeInfo } from "@/utils/apiHandler/singleNodeParser";
import useSavedNodesStore from "@/utils/savedNodes";
import { ThemedText } from "../ThemedText";
import { useMemo } from "react";
import { act } from "react-test-renderer";

export const QuickActions = ({
	nodeId,
	nodeInfo,
}: {
	nodeId: string;
	nodeInfo: NodeInfo;
}) => {
	const savedNodes = useSavedNodesStore((state) => state.items);
	const saveNode = useSavedNodesStore((state) => state.addItem);

	const isCurrentNodeSaved = useMemo(
		() => savedNodes[nodeId] !== undefined,
		[savedNodes, nodeId]
	);

	return (
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
			<QuickAction
				icon={faBookmark}
				activeIcon={faSolidBookmark}
				active={isCurrentNodeSaved}
				activeColor="#FFD700"
				onPress={() => {
					saveNode(nodeInfo);
				}}
			></QuickAction>
		</View>
	);
};

export const QuickAction = ({
	icon,
	activeIcon,
	active = false,
	activeColor,
	onPress,
}: {
	icon: any;
	activeIcon?: any;
	active?: boolean;
	activeColor?: string;
	onPress: () => void;
}) => (
	<Pressable
		className="h-16 flex items-center justify-center rounded-md flex-1"
		onPress={onPress}
		android_ripple={rippleConfig}
	>
		<FontAwesomeIcon
			icon={active ? activeIcon : icon}
			size={25}
			color={active ? activeColor : getIconColor()}
		/>
	</Pressable>
);
