import { Search } from "@/components/navigation/header/search";
import { Item } from "@/components/Nodes/NodeItem";
import { DynamicNodeList } from "@/components/Nodes/DynamicNodeList";
import { fetchRoot, getSearchUrl } from "@/utils/apiHandler/dataFetcher";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { useState } from "react";

export default function SearchScreen() {
	let [data, setData] = useState<Item[]>([]);
	let [url, setUrl] = useState("");

	// useEffect(() => {
	// 	console.log(data);
	// }, [data]);

	return (
		<>
			<Search
				onSubmit={async (q) => {
					const url = getSearchUrl(q);
					setUrl(url);
					setData(getNodeList(await fetchRoot(url), url));
				}}
			/>
			{url !== "" && <DynamicNodeList category={url} />}
		</>
	);
}
