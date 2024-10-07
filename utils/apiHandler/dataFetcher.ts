import HTMLparser, { HTMLElement } from "fast-html-parser";

export const fetchData = async (url: string): Promise<string> => {
	const response = await fetch("https://www.cheapies.nz/" + url);
	const html = await response.text();

	return html;
};

export const fetchRoot = async (url: string): Promise<HTMLElement> => {
	console.log("fetching", url);
	const data = await fetchData(url);

	const root = HTMLparser.parse(data);

	return root;
};
export const getSearchUrl = (
	query: string,
	type: string | undefined = undefined
) => {
	if (type) query += ` type:${type}`;
	return `search/node/${encodeURIComponent(query)}`;
};
