import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "react-native";
import { DropdownComponent } from "./headDropdown";

const iconColor = "rgba(255, 255, 255, 0.6)";

export const Header = ({
	onCategoryChange,
}: {
	onCategoryChange: (value: string) => void;
}) => (
	<View className="flex flex-row gap-4 p-4 pt-12 px-[1.5rem] bg-neutral-800 items-center">
		<FontAwesomeIcon icon={faBars} size={23} color={iconColor} />
		<DropdownComponent onCategoryChange={onCategoryChange} />
		{/* <Pressable className="flex flex-row items-center gap-1.5">
    <ThemedText className="text-xl">Deals</ThemedText>
    <FontAwesomeIcon
        size={12}
        icon={faChevronDown}
        color={iconColor}
    ></FontAwesomeIcon>
</Pressable> */}
		<View className="flex-1"></View>
		<View className="aspect-square bg-neutral-500 self-stretch pt-[7px] pl-[3.5px] rounded-full overflow-hidden">
			<FontAwesomeIcon icon={faUser} size={20} color={iconColor} />
		</View>
	</View>
);
