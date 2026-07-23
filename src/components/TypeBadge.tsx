import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getPokemonTypeColor } from "../constants/colors";

interface TypeBadgeProps {
  type: string;
  size?: "small" | "medium" | "large";
}

export function TypeBadge({ type, size = "medium" }: TypeBadgeProps) {
  const backgroundColor = getPokemonTypeColor(type);

  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor },
        isSmall && styles.badgeSmall,
        isLarge && styles.badgeLarge,
      ]}
    >
      <Text
        style={[
          styles.text,
          isSmall && styles.textSmall,
          isLarge && styles.textLarge,
        ]}
      >
        {type.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  textSmall: {
    fontSize: 10,
  },
  textLarge: {
    fontSize: 14,
  },
});
