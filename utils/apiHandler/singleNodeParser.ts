import { fetchData } from "./dataFetcher";
import HTMLparser, { HTMLElement } from "fast-html-parser";

export interface NodeInfo {
	title: string;
	titleElements: HTMLElement[];
	description: string;
	descriptionElement: HTMLElement;
	image: string;
	upvotes: number;
	downvotes: number;
	tags: string[];
}

import * as htmlparser2 from "htmlparser2";

const removeWhitespace = (root: HTMLElement) => {
	var i = 0,
		o = 0;
	for (; i < root.childNodes.length; i++) {
		var node = root.childNodes[i];
		console.log(node.nodeType);
		if (node.nodeType === 3) {
			console.log("i is ", i);
			if (node.isWhitespace) continue;
			if (i === 0) node.rawText = node.rawText.trimLeft();
			// else console.log("hiiii");
			if (i === root.childNodes.length - 1)
				node.rawText = node.rawText.trimRight();
		} else if (node.nodeType === 1) {
			removeWhitespace(node);
		}
		root.childNodes[o++] = node;
	}
	root.childNodes.length = o;
	return root;
};

export async function getNodeInfo(id: string): Promise<NodeInfo> {
	let data = await fetchData(`node/${id}`);

	const root = HTMLparser.parse(data);

	const main = root.querySelector("#main");

	const titleElem = main?.querySelector(".title");
	const title = titleElem?.text ?? "No title";

	let descriptionElem = main?.querySelector(".content");

	console.log(
		descriptionElem?.childNodes.map((e) => ({ name: e.tagName, text: e.text }))
	);

	const description = descriptionElem?.text ?? "No description";
	descriptionElem = removeWhitespace(descriptionElem!!);

	const image = main?.querySelector(".content img")?.attributes.src ?? "";

	const upvotes = parseInt(main?.querySelector(".voteup")?.text ?? "0");
	const downvotes = parseInt(main?.querySelector(".votedown")?.text ?? "0");

	return {
		title,
		titleElements: titleElem?.childNodes ?? [],
		description,
		descriptionElement: descriptionElem!!,
		image,
		upvotes,
		downvotes,
		tags: [],
	};
}