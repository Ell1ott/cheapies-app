import { getBgColor } from "@/utils/themeColor";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect, forwardRef } from "react";

interface SearchProps {
	onSubmit: (query: string) => void | Promise<void> | undefined;
}

export const Search: forwardRef<SearchProps> = ({ onSubmit }) => {
	const [query, setQuery] = useState("");
	const [search, setSearch] = useState()


	useEffect(() => {
		console.log(search)
		if (search) {
			search.focus();
		}
	});

	return (
		<SearchBar
			ref={s => setSearch(s)}
			placeholder="Search..."
			placeholderTextColor={"#9CA3AF"}
			containerStyle={{ backgroundColor: getBgColor(), paddingTop: 35 }}
			placeholderClassName="text-white"
			inputStyle={{ color: "white" }}
			value={query}
			onChangeText={setQuery}
			onSubmitEditing={() => onSubmit(query)}
		/>
	);
};
