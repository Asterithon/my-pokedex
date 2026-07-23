import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getPokemonTypeColor } from "../constants/colors";
import { PokemonBasicDetails } from "../types/pokemon";
import { TypeBadge } from "./TypeBadge";

interface PokemonCardProps {
  pokemon: PokemonBasicDetails;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType = pokemon.types[0] || "normal";
  const cardBg = getPokemonTypeColor(primaryType);
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
          { backgroundColor: cardBg + "DD" }, // subtle opacity
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.contentLeft}>
          <Text style={styles.number}>{formattedId}</Text>
          <Text style={styles.name}>{capitalizedName}</Text>

          <View style={styles.badgeContainer}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} size="small" />
            ))}
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pokemon.image }}
            style={styles.image}
            contentFit="contain"
            transition={300}
          />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  contentLeft: {
    flex: 1,
  },
  number: {
    fontSize: 13,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.45)",
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  imageContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
});
