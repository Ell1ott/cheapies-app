// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { type ComponentProps } from "react";

export function TabBarIcon({
	style,
	...rest
}: ComponentProps<typeof FontAwesomeIcon>) {
	return (
		<FontAwesomeIcon
			size={25}
			style={[{ marginBottom: -3 }, style]}
			icon={faQuestion}
			{...rest}
		/>
	);
}
