import HTMLparser from "fast-html-parser";

export const fetchData = async (url: string) => {
	const response = await fetch("https://www.cheapies.nz/" + url);
	const html = await response.text();
	const root = HTMLparser.parse(html);
	const items = root.querySelectorAll(".node");
	// let descriptons = root.querySelectorAll("dd p");
	// if (descriptons.length === 0) descriptons = root.querySelectorAll(".content");

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
				description:
					url == "competition"
						? null
						: description?.text
								.replace(/(\r\n|\n|\r)/gm, " ")
								.replace(/\s{2,}/g, " "),
			};
		})
		.filter((item) => item);
};
