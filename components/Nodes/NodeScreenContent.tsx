import { HTMLElement } from "fast-html-parser";
import { ThemedText } from "../ThemedText";
import { Text, View } from "react-native";

export const NodeScreenContent = ({ elem }: { elem: HTMLElement }) => {
	if (elem.rawText && !elem.tagName) {
		return <Text>{elem.text}</Text>;
	}

	const children = NodeScreenContentChildren(elem);

	switch (elem.tagName) {
		case "blockquote":
			return (
				<View className="ml-2 pl-4 my-2 border-l-4 border-blue-400">
					{children}
				</View>
			);
		case "div":
			return <View>{children}</View>;
		case "p":
			return (
				<ThemedText className="pb-2 text-lg leading-[1.6rem]">
					{children}
				</ThemedText>
			);
		case "strong":
			return <ThemedText className="font-bold">{children}</ThemedText>;
		case "a":
			return <ThemedText style={{ color: "#60a5fa" }}>{children}</ThemedText>;

		case "ul":
			return children;
		case "li":
			return (
				<View className="pb-2 flex flex-row">
					<ThemedText>{"\u2022 "}</ThemedText>
					<View>{children}</View>
				</View>
			);
		default:
			return <></>;
	}
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
