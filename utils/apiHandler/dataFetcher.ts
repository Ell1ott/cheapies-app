export const fetchData = async (url: string): Promise<string> => {
	const response = await fetch("https://www.cheapies.nz/" + url);
	const html = await response.text();

	return html;
};

export const getSearchUrl = (
	query: string,
	type: string | undefined = undefined
) => {
	if (type) query += ` type:${type}`;
	return `search/node/${encodeURIComponent(query)}`;
};
