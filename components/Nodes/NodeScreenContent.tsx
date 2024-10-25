import { HTMLElement } from "fast-html-parser";
import { ThemedText } from "../ThemedText";
import { Linking, Text, View } from "react-native";
import React from "react";

export const NodeScreenContent = ({ elem }: { elem: HTMLElement }) => {
	if (elem.rawText && !elem.tagName) {
		return <Text>{elem.text}</Text>;
	}

	if (elem.classNames.includes("affdisclosure")) return <></>;

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
			const [pressed, setPressed] = React.useState(false);
			return (
				<ThemedText
					onPress={() => Linking.openURL(elem.attributes.href)}
					style={{
						color: "#60a5fa",
						textDecorationLine: pressed ? "underline" : "none",
						backgroundColor: pressed ? "#e5e7eb20" : "transparent",
					}}
					onPressIn={() => setPressed(true)}
					onPressOut={() => setPressed(false)}
				>
					{children}
				</ThemedText>
			);

		case "ul":
			return children;
		case "li":
			return (
				<View className="pb-2 pl-2 flex flex-row gap-2">
					<ThemedText>{"\u2022 "}</ThemedText>
					<View>
						<ThemedText>{children}</ThemedText>
					</View>
				</View>
			);
		default:
			return <></>;
	}
};

const NodeScreenContentChildren = (elem: HTMLElement) => {
	if (!elem) return <></>;
	if (!elem.childNodes) return <></>;

	return (
		<>
			{elem.childNodes.map((e, i) => (
				<NodeScreenContent key={i} elem={e} />
			))}
		</>
	);
};
