import { getSearchUrl } from "@/utils/apiHandler/dataFetcher";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";

// /c:/Users/ellio/Dokumenter/GitHub/cheapies-app/tests/apihandler.test.ts

// Assuming the hello function is defined in a file called apihandler.ts

describe("getNodeList of deals", () => {
	it("should return a list of nodes from the cheapies website", async () => {
		const result = await getNodeList("deals");
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].title).toBeDefined();
		expect(result[0].url).toBeDefined();
		expect(result[0].description).toBeDefined();
		expect(result[0].title).not.toBe("");
		expect(result[0].nodeId).toBeDefined();
		expect(result[0].nodeId).not.toBe("");
		// console.log(result);
	});
});
describe("getNodeList of feebies", () => {
	it("should return a list of nodes from the cheapies website", async () => {
		const result = await getNodeList("freebies");
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].title).toBeDefined();
		expect(result[0].url).toBeDefined();
		expect(result[0].description).toBeDefined();
		expect(result[0].title).not.toBe("");
		// console.log(result);
	});
});

describe("getNodeList of search results", () => {
	it("should return a list of nodes from the cheapies website", async () => {
		const searchUrl = getSearchUrl("search");

		const result = await getNodeList(searchUrl);
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].title).toBeDefined();
		expect(result[0].url).toBeDefined();
		expect(result[0].description).toBeDefined();
		expect(result[0].title).not.toBe("");
		// console.log(result);
	});
});
describe("getNodeList of competitions", () => {
	it("should return a list of nodes from the cheapies website", async () => {
		const result = await getNodeList("competition");
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].title).toBeDefined();
		expect(result[0].url).toBeDefined();
		// expect(result[0].description).toBeDefined(); they dont have one
		expect(result[0].title).not.toBe("");
		// console.log(result);
	});
});
