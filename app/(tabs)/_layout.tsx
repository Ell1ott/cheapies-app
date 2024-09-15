import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	faCompass as faCompassSolid,
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
				name="fe"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faCompass} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="Basic"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faSearch} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faBookmark} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon icon={faGear} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
