import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	faCompass as faCompassSolid,
	faBookmark as faBookmarkSolid,
	faGear,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faCompass, faBookmark } from "@fortawesome/free-regular-svg-icons";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							icon={focused ? faCompassSolid : faCompass}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faSearch} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="saved"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							icon={focused ? faBookmarkSolid : faBookmark}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faGear} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
