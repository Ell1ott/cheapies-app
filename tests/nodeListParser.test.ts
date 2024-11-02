import { fetchRoot, getSearchUrl } from "@/utils/apiHandler/dataFetcher";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";

// /c:/Users/ellio/Dokumenter/GitHub/cheapies-app/tests/apihandler.test.ts

// Assuming the hello function is defined in a file called apihandler.ts

describe("getNodeList of deals", () => {
	it("should return a list of nodes from the cheapies website", async () => {
		const result = getNodeList(await fetchRoot("deals"), "deals");
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].title).toBeDefined();
		expect(result[0].description).toBeDefined();
		expect(result[0].title).not.toBe("");
		expect(result[0].id).toBeDefined();
		expect(result[0].id).not.toBe("");
		expect(result[0].commentCount).toBeDefined();
		expect(result[0].commentCount).toBeGreaterThan(-1);
		// console.log(result);
	});
});
describe("getNodeList of feebies", () => {
	it("should return a list of nodes from the cheapies website", async () => {
		const result = getNodeList(await fetchRoot("freebies"), "freebies");
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].title).toBeDefined();
		expect(result[0].description).toBeDefined();
		expect(result[0].title).not.toBe("");
		expect(result[0].id).toBeDefined();
		expect(result[0].id).not.toBe("");
		expect(result[0].commentCount).toBeDefined();
		expect(result[0].commentCount).toBeGreaterThan(-1);
		// console.log(result);
	});
});

describe("getNodeList of search results", () => {
	it("should return a list of nodes from the cheapies website", async () => {
		const searchUrl = getSearchUrl("search");

		const result = getNodeList(await fetchRoot(searchUrl), searchUrl);
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].title).toBeDefined();
		expect(result[0]).toBeDefined();
		expect(result[0].description).toBeDefined();
		expect(result[0].title).not.toBe("");
		expect(result[0].id).toBeDefined();
		expect(result[0].id).not.toBe("");
		expect(result[0].commentCount).toBeDefined();
		expect(result[0].commentCount).toBeGreaterThan(-1);
		// console.log(result);
	});
});
describe("getNodeList of competitions", () => {
	it("should return a list of nodes from the cheapies website", async () => {
		const result = getNodeList(await fetchRoot("competition"), "competition");
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].title).toBeDefined();
		// expect(result[0].description).toBeDefined(); they dont have one
		expect(result[0].title).not.toBe("");
		expect(result[0].commentCount).toBeDefined();
		expect(result[0].commentCount).toBeGreaterThan(-1);
		// console.log(result);
	});
});
