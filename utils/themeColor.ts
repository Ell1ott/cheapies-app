import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export const getBgColor = () =>
	useThemeColor(
		{
			light: Colors.light.SecondaryBackground,
			dark: Colors.dark.SecondaryBackground,
		},
		"background"
	);

export const getIconColor = () => "rgba(255, 255, 255, 0.6)";
