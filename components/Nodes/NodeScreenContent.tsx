import { HTMLElement } from "fast-html-parser";
import { ThemedText } from "../ThemedText";
import { Text, View } from "react-native";

export const NodeScreenContent = ({ elem }: { elem: HTMLElement }) => {
	if (elem.rawText && !elem.tagName) {
		return <Text>{elem.text}</Text>;
	}

	if (elem.childNodes == undefined) return <></>;
	if (elem.tagName === "p")
		return (
			<ThemedText className="pb-2 text-lg leading-[1.6rem]">
				{NodeScreenContentChildren(elem)}
			</ThemedText>
		);
	if (elem.tagName === "strong")
		return (
			<ThemedText className="font-bold">
				{NodeScreenContentChildren(elem)}
			</ThemedText>
		);

	if (elem.tagName === "a") {
		return (
			<ThemedText style={{ color: "#60a5fa" }}>
				{NodeScreenContentChildren(elem)}
			</ThemedText>
		);
	}

	if (elem.tagName === "blockquote") {
		return (
			<View className="ml-2 pl-4 my-2 border-l-4 border-blue-400">
				{NodeScreenContentChildren(elem)}
			</View>
		);
	}

	if (elem.tagName === "div") {
		return <View>{NodeScreenContentChildren(elem)}</View>;
	}

	if (elem.tagName === "ul") {
		return NodeScreenContentChildren(elem);
	}

	if (elem.tagName === "li") {
		return (
			<View className="pb-2 flex flex-row">
				<ThemedText>{"\u2022 "}</ThemedText>
				<View>{NodeScreenContentChildren(elem)}</View>
			</View>
		);
	}

	return <></>;
};

const NodeScreenContentChildren = (elem: HTMLElement) => {
	if (!elem) return <></>;
	if (elem.childNodes == undefined) return <></>;

	if (elem.tagName === "p") {
	}

	const l = (
		<>
			{elem.childNodes.map((e, i) => (
				<NodeScreenContent key={i} elem={e} />
			))}
		</>
	);

	return l;
};
