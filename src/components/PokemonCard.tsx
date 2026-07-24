import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getPokemonTypeColor, hexToRgba } from "../constants/colors";
import { PokemonBasicDetails } from "../types/pokemon";
import { TypeBadge } from "./TypeBadge";

interface PokemonCardProps {
  pokemon: PokemonBasicDetails;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();
  const primaryType = pokemon.types[0] || "normal";
  const primaryColorHex = getPokemonTypeColor(primaryType);
  // 40% opacity card background color (1 single clean solid color box, no borders, no shadow outline)
  const cardBg40Percent = hexToRgba(primaryColorHex, 0.4);

  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const handlePress = () => {
    router.push({ pathname: "/details", params: { name: pokemon.name } });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: cardBg40Percent },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardInfo}>
        <Text style={styles.number}>{formattedId}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {capitalizedName}
        </Text>

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
          transition={200}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    minHeight: 180,
    justifyContent: "space-between",
    elevation: 0,
    shadowOpacity: 0,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  cardInfo: {
    marginBottom: 4,
  },
  number: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.5)",
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
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
    width: 100,
    height: 100,
  },
});
