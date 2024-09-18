import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const inputRef = useRef<TextInput>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<View className="flex-1">
			<TextInput
				ref={inputRef}
				placeholder="Search..."
				placeholderClassName="text-naturel-900"
				className="bg-neutral-700 rounded-lg p-1 px-4"
				value={query}
				onChangeText={setQuery}
			/>
		</View>
	);
};

export default SearchBar;
