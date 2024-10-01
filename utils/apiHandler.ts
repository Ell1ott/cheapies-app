import { Item } from "@/components/Nodes/NodeItem";
import HTMLparser, { HTMLElement } from "fast-html-parser";

export const parseNodeList = (html: string, url: string) => {
	const root = HTMLparser.parse(html);
	const items = root.querySelectorAll(".node");
	if (url.includes("search")) root;

	let currentId = 0;

	return items
		.map((item, index) => {
			currentId++;
			const title = item.querySelector(".title");
			if (!title) return null;
			const description =
				item.querySelector(".content") || item.querySelector("dd p");
			if (!description) return null;

			return parseNodeItem(title, item, item, currentId, description, url);
		})
		.filter((item) => item) as Item[];
};

interface Tag {
	type: string;
	text: string;
}

const parseNodeItem = (
	title: HTMLElement,
	item: HTMLElement,
	imageContainer: HTMLElement,
	id: number,
	description: HTMLElement,
	url: string
): Item => {
	const titleElems = title?.childNodes.find(
		(e) => e.tagName === "a"
	)?.childNodes;

	return {
		title: title?.childNodes.find((e) => e.tagName === "a")?.text ?? "No title",
		titleElements: titleElems,
		id: id + "",
		tags: title
			.querySelectorAll(".tagger")
			.map((tag: any) => ({ type: tag.classNames[1], text: tag.text })),
		image: imageContainer.querySelector("a img")?.attributes.src,
		upvotes: parseInt(item.querySelector(".voteup")?.text ?? "0"),
		downvotes: parseInt(item.querySelector(".votedown")?.text ?? "0"),
		url: title?.querySelector("a")?.attributes.href ?? "",
		description:
			url == "competition"
				? undefined
				: description?.text
						.replaceAll(/(\r\n|\n|\r)/gm, " ")
						.replaceAll(/\s{2,}/g, " ")
						.replaceAll("…", ""),
	};
};

export const parseSearchResults = (html: string, url: string) => {
	const root = HTMLparser.parse(html);
	const sr = root.querySelector(".search-results");
	if (!sr) return [];
	const titles = sr.querySelectorAll(".title");
	const contents = sr.querySelectorAll("dd");

	console.log(titles.length, contents.length);

	const items = titles.map((title, index) => {
		return parseNodeItem(
			title,
			contents[index],
			title,
			index,
			contents[index],
			url
		);
	});

	return items;
};

export const fetchData = async (url: string): Promise<string> => {
	const response = await fetch("https://www.cheapies.nz/" + url);
	const html = await response.text();

	return html;
};

export const getNodeList = async (url: string): Promise<Item[]> => {
	console.log(url);
	const html = await fetchData(url);
	// console.log(html);
	if (url.includes("search")) return parseSearchResults(html, url);
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

export const getSearchUrl = (
	query: string,
	type: string | undefined = undefined
) => {
	if (type) query += ` type:${type}`;
	return `search/node/${encodeURIComponent(query)}`;
};
