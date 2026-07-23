import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { statColors } from "../constants/colors";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

const statShortNames: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};

export function StatBar({ label, value, maxValue = 255 }: StatBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  const barColor = statColors[label] || "#6390F0";
  const displayLabel = statShortNames[label] || label.toUpperCase();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{displayLabel}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%`, backgroundColor: barColor },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    width: 45,
    fontSize: 13,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    width: 35,
    fontSize: 13,
    fontWeight: "bold",
    color: "#111",
    textAlign: "right",
    marginRight: 10,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
});
