import { getIconColor } from "@/utils/themeColor";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, View } from "react-native";

export const QuickActions = () => (
	<View className="flex flex-row gap-3">
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
		className="h-20 bg-neutral-600 flex items-center justify-center rounded-md flex-1"
		onPress={onPress}
	>
		<FontAwesomeIcon icon={icon} size={25} color={getIconColor()} />
	</Pressable>
);
