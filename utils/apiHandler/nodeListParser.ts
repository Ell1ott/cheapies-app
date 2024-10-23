import { Item } from "@/components/Nodes/NodeItem";
import HTMLparser, { HTMLElement } from "fast-html-parser";

export const parseNodeList = (root: HTMLElement, url: string) => {
	const items = root.querySelectorAll(".node");

	let currentId = 0;

	return items
		.map((item, index) => {
			currentId++;
			const title = item.querySelector(".title");
			if (!title) return null;
			const description =
				item.querySelector(".content") || item.querySelector("dd p");

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
	description: HTMLElement | undefined | null,
	url: string
): Item => {
	const titleElems = title?.childNodes.find(
		(e) => e.tagName === "a"
	)?.childNodes;

	const nodeUrl = title?.querySelector("a")?.attributes.href ?? "";

	const nodeId = nodeUrl.split("/").pop() ?? "";

	return {
		title: title?.childNodes.find((e) => e.tagName === "a")?.text ?? "No title",
		titleElements: titleElems,
		id: nodeId + "",
		tags: title
			.querySelectorAll(".tagger")
			.map((tag: any) => ({ type: tag.classNames[1], text: tag.text })),
		image: imageContainer.querySelector("a img")?.attributes.src,
		upvotes: parseInt(item.querySelector(".voteup")?.text ?? "0"),
		downvotes: parseInt(item.querySelector(".votedown")?.text ?? "0"),
		url: nodeUrl,
		description:
			url == "competition"
				? undefined
				: description?.text
						.replaceAll(/(\r\n|\n|\r)/gm, " ")
						.replaceAll(/\s{2,}/g, " ")
						.replaceAll("…", ""),

		nodeId: nodeId,
	};
};

export const parseSearchResults = (elem: HTMLElement, url: string) => {
	const sr = elem.querySelector(".search-results");
	if (!sr) return [];
	const titles = sr.querySelectorAll(".title");
	const contents = sr.querySelectorAll("dd");

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

export const getNodeList = (root: HTMLElement, url: string = ""): Item[] => {
	// console.log(html);
	if (url.includes("search")) return parseSearchResults(root, url);
	const items = parseNodeList(root, url);

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
