import { BlankHeader, Header } from "@/components/navigation/header/header";
import SearchBar from "@/components/navigation/header/searchBar";
import { NodeList } from "@/components/Nodes/NodeList";

export default function SearchScreen() {
	return (
		<>
			<BlankHeader>
				<SearchBar />
			</BlankHeader>
			<NodeList items={[]} />
		</>
	);
}
