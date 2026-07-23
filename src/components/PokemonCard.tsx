import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getPokemonTypeColor, hexToRgba } from "../constants/colors";
import { PokemonBasicDetails } from "../types/pokemon";
import { TypeBadge } from "./TypeBadge";

interface PokemonCardProps {
  pokemon: PokemonBasicDetails;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType = pokemon.types[0] || "normal";
  const primaryColorHex = getPokemonTypeColor(primaryType);
  // 50% opacity background color based on primary type
  const cardBg50Percent = hexToRgba(primaryColorHex, 0.5);

  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Link
      href={{ pathname: "/details", params: { name: pokemon.name } }}
      asChild
    >
      <Pressable
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: cardBg50Percent },
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.number}>{formattedId}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {capitalizedName}
        </Text>

        <View style={styles.badgeContainer}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} size="small" />
          ))}
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pokemon.image }}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 18,
    padding: 14,
    minHeight: 160,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  number: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 2,
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 6,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  image: {
    width: 80,
    height: 80,
  },
});
