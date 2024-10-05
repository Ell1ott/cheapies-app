import { getSearchUrl } from "@/utils/apiHandler/dataFetcher";
import { getNodeList } from "@/utils/apiHandler/nodeListParser";
import { getNodeInfo } from "@/utils/apiHandler/singleNodeParser";
import HTMLparser, { HTMLElement } from "fast-html-parser";
// /c:/Users/ellio/Dokumenter/GitHub/cheapies-app/tests/apihandler.test.ts

// Assuming the hello function is defined in a file called apihandler.ts

describe("getNodeInformation from a single node", () => {
	it("should return all the info of a given node", async () => {
		const result = await getNodeInfo("48557");
		expect(result.title).toBeDefined();
		expect(result.title).not.toBe("");

		console.log(result.descriptionElement.structure);

		expect(result.descriptionElement.tagName).toBe("div");

		// console.log(result);
	});
});
