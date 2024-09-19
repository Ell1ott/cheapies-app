import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { SearchBar } from "@rneui/themed";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getBgColor } from "@/utils/themeColor";
// import { getBgColor } from "@/utils/themeColor";
interface SearchProps {
	onSubmit: (query: string) => void | Promise<void> | undefined;
}

export const Search: React.FC<SearchProps> = ({ onSubmit }) => {
	const [query, setQuery] = useState("");

	let s = null;
	useEffect(() => {
		if (s) s.focus();
	}, []);

	return (
		<SearchBar
			ref={(search: any) => (s = search)}
			placeholder="Search..."
			placeholderTextColor={"#9CA3AF"}
			containerStyle={{ backgroundColor: getBgColor(), paddingTop: 35 }}
			// placeholderClassName="text-neutral-200"
			placeholderClassName="text-white"
			inputStyle={{ color: "white" }}
			underlineColorAndroid={"transparent"}
			value={query}
			onChangeText={setQuery}
			onSubmitEditing={() => onSubmit(query)}
		/>
	);
};
