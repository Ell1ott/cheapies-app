import { View } from "react-native";

export const Separator = ({ className }: { className: string }) => {
	return <View className={"h-[1px] bg-white/10 " + className}></View>;
};
