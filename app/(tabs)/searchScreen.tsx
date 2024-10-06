import { Search } from "@/components/navigation/header/search";
import { Item } from "@/components/Nodes/NodeItem";
import { NodeList } from "@/components/Nodes/NodeList";
import { getSearchUrl } from "@/utils/apiHandler/dataFetcher";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { useEffect, useState } from "react";

export default function SearchScreen() {
	let [data, setData] = useState<Item[]>([]);

	// useEffect(() => {
	// 	console.log(data);
	// }, [data]);

	return (
		<>
			<Search
				onSubmit={async (q) => setData(await getNodeList(getSearchUrl(q)))}
			/>

			<NodeList items={data} />
		</>
	);
}