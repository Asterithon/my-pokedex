import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colorsByType, getPokemonTypeColor } from "../constants/colors";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

const ALL_TYPES = Object.keys(colorsByType);

export function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.inputWrapper}>
        <Ionicons name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Cari Pokémon (Nama atau #ID)..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery("")} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={18} color="#888" />
          </Pressable>
        )}
      </View>

      {/* Filter Chips Horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        <Pressable
          style={[
            styles.chip,
            selectedType === null ? styles.chipActive : styles.chipInactive,
          ]}
          onPress={() => setSelectedType(null)}
        >
          <Text
            style={[
              styles.chipText,
              selectedType === null
                ? styles.chipTextActive
                : styles.chipTextInactive,
            ]}
          >
            SEMUA
          </Text>
        </Pressable>

        {ALL_TYPES.map((type) => {
          const isSelected = selectedType === type;
          const bg = getPokemonTypeColor(type);
          return (
            <Pressable
              key={type}
              style={[
                styles.chip,
                isSelected
                  ? { backgroundColor: bg }
                  : { backgroundColor: "#EAEAEA" },
              ]}
              onPress={() =>
                setSelectedType(isSelected ? null : type)
              }
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected
                    ? { color: "#FFFFFF" }
                    : { color: "#444444" },
                ]}
              >
                {type.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
  },
  clearBtn: {
    padding: 4,
  },
  filterScroll: {
    paddingVertical: 10,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chipActive: {
    backgroundColor: "#3B82F6",
  },
  chipInactive: {
    backgroundColor: "#E5E7EB",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  chipTextInactive: {
    color: "#4B5563",
  },
});
