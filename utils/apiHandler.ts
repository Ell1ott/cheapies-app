import HTMLparser from "fast-html-parser";

export const fetchData = async () => {
	const response = await fetch("https://www.cheapies.nz/cat/education");
	const html = await response.text();
	const root = HTMLparser.parse(html);
	const items = root.querySelectorAll(".title");
	let descriptons = root.querySelectorAll("dd p");
	if (descriptons.length === 0) descriptons = root.querySelectorAll(".content");
	console.log(items.length);
	console.log(items.length);

	let currentId = 0;

	return items.map((item, index) => {
		currentId++;
		const title = item.childNodes.find((node) => node.tagName === "a");
		console.log(descriptons);
		console.log(title);
		return {
			title: title?.text,
			id: currentId + "",
			tags: item
				.querySelectorAll(".tagger")
				.map((tag) => ({ type: tag.classNames[1], text: tag.text })),
			description: descriptons[index].text
				.replace(/(\r\n|\n|\r)/gm, " ")
				.replace(/\s{2,}/g, " "),
		};
	});
};
