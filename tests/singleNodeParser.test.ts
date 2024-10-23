import { fetchData, getSearchUrl } from "@/utils/apiHandler/dataFetcher";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { getNodeInfo } from "@/utils/apiHandler/singleNodeParser";
import HTMLparser, { HTMLElement } from "fast-html-parser";
// /c:/Users/ellio/Dokumenter/GitHub/cheapies-app/tests/apihandler.test.ts
import * as fs from "fs";
// Assuming the hello function is defined in a file called apihandler.ts

describe("getNodeInformation from a single node", () => {
	it("should return all the info of a given node", async () => {
		let data = await fetchData(`node/48651`);
		// fs.writeFileSync("output.txt", data);
		const result = await getNodeInfo("48651");

		expect(result.title).toBeDefined();
		expect(result.title).not.toBe("");

		console.log(result.descriptionElement.structure);

		expect(result.descriptionElement.tagName).toBe("div");

		// console.log(result);
	});
});
