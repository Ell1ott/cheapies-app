import { Item } from "@/components/Nodes/NodeItem";
import HTMLparser from "fast-html-parser";

export const parseNodeList = (html: string, url: string) => {
	const root = HTMLparser.parse(html);
	const items = root.querySelectorAll(".node");

	let currentId = 0;

	return items
		.map((item, index) => {
			currentId++;
			const title = item.querySelector(".title");
			if (!title) return null;
			const description =
				item.querySelector(".content") || item.querySelector("dd p");

			console.log(title);
			return {
				title: title?.querySelector("a")?.text,
				id: currentId + "",
				tags: title
					.querySelectorAll(".tagger")
					.map((tag) => ({ type: tag.classNames[1], text: tag.text })),
				image: item.querySelector("a img")?.attributes.src,
				upvotes: item.querySelector(".voteup")?.text ?? 0 + 0 ?? 0,
				downvotes: item.querySelector(".votedown")?.text ?? 0 + 0 ?? 0,
				url: title?.querySelector("a")?.attributes.href,
				description:
					url == "competition"
						? null
						: description?.text
								.replaceAll(/(\r\n|\n|\r)/gm, " ")
								.replaceAll(/\s{2,}/g, " ")
								.replaceAll("…", ""),
			};
		})
		.filter((item) => item);
};

export const fetchData = async (url: string): Promise<string> => {
	const response = await fetch("https://www.cheapies.nz/" + url);
	const html = await response.text();

	return html;
};

export const getNodeList = async (url: string): Promise<Item[]> => {
	const html = await fetchData(url);
	const items = parseNodeList(html, url);
	return items;
};

export const parseNodeInfo = (html: string) => {
	const root = HTMLparser.parse(html);
	const title = root.querySelector(".title");
	const content = root.querySelector(".content");

	return {
		title: title?.text,
		content: content?.text,
	};
};
