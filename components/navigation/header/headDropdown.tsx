import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const dropDownData = [
	{ label: "Deals", value: "deals" },
	{ label: "Vouchers", value: "vouchers" },
	{ label: "Freebies", value: "freebies" },
	{ label: "Comps", value: "competitions" },
];

export const DropdownComponent = ({
	onCategoryChange,
}: {
	onCategoryChange: (value: string) => void;
}) => {
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
					onCategoryChange(item.value);
					setIsFocus(false);
				}}
			/>
		</View>
	);
};
