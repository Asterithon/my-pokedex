import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatBar } from "../src/components/StatBar";
import { TypeBadge } from "../src/components/TypeBadge";
import { getPokemonTypeColor } from "../src/constants/colors";
import {
  fetchPokemonFullDetails,
  fetchPokemonSpeciesInfo,
} from "../src/services/pokeApi";
import { PokemonFullDetails, PokemonSpeciesInfo } from "../src/types/pokemon";

export default function Details() {
  const { name } = useLocalSearchParams<{ name?: string }>();
  const [pokemon, setPokemon] = useState<PokemonFullDetails | null>(null);
  const [species, setSpecies] = useState<PokemonSpeciesInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (name) {
      loadDetails(name);
    }
  }, [name]);

  async function loadDetails(pokemonName: string) {
    setLoading(true);
    const details = await fetchPokemonFullDetails(pokemonName);
    if (details) {
      setPokemon(details);
      const speciesInfo = await fetchPokemonSpeciesInfo(details.id);
      setSpecies(speciesInfo);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Memuat detail Pokémon...</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Detail Pokémon tidak ditemukan.</Text>
      </View>
    );
  }

  const primaryType = pokemon.types[0] || "normal";
  const headerBg = getPokemonTypeColor(primaryType);
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const totalStats = pokemon.stats.reduce((acc, curr) => acc + curr.value, 0);

  // Convert decimeters to meters & hectograms to kg
  const heightMeters = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Hero Header Card */}
      <View style={[styles.heroCard, { backgroundColor: headerBg }]}>
        <View style={styles.heroHeader}>
          <Text style={styles.pokemonName}>{capitalizedName}</Text>
          <Text style={styles.pokemonId}>{formattedId}</Text>
        </View>

        {species && <Text style={styles.genusText}>{species.genus}</Text>}

        <View style={styles.badgeRow}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} size="medium" />
          ))}
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: pokemon.artwork || pokemon.imageFront }}
            style={styles.heroImage}
            contentFit="contain"
            transition={400}
          />
        </View>
      </View>

      {/* Pokédex Description / Flavor Text */}
      {species && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Deskripsi Pokédex</Text>
          <Text style={styles.flavorText}>“{species.flavorText}”</Text>
        </View>
      )}

      {/* Physical Characteristics (Height, Weight, Abilities) */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Karakteristik Fisik</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>TINGGI</Text>
            <Text style={styles.metricValue}>{heightMeters} m</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>BERAT</Text>
            <Text style={styles.metricValue}>{weightKg} kg</Text>
          </View>
        </View>

        <View style={styles.abilitiesContainer}>
          <Text style={styles.metricLabel}>KEMAMPUAN (ABILITIES)</Text>
          <View style={styles.abilitiesRow}>
            {pokemon.abilities.map((ability) => (
              <View key={ability} style={styles.abilityBadge}>
                <Text style={styles.abilityText}>
                  {ability.replace("-", " ").toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Base Stats Section */}
      <View style={styles.sectionCard}>
        <View style={styles.statsHeaderRow}>
          <Text style={styles.sectionTitle}>Statistik Dasar (Base Stats)</Text>
          <Text style={styles.totalStatsText}>Total: {totalStats}</Text>
        </View>

        {pokemon.stats.map((stat) => (
          <StatBar key={stat.name} label={stat.name} value={stat.value} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  pokemonId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.75)",
  },
  genusText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 6,
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  heroImage: {
    width: 180,
    height: 180,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  flavorText: {
    fontSize: 14,
    color: "#475569",
    fontStyle: "italic",
    lineHeight: 22,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 8,
  },
  metricItem: {
    alignItems: "center",
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#94A3B8",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  divider: {
    width: 1,
    height: 35,
    backgroundColor: "#E2E8F0",
  },
  abilitiesContainer: {
    marginTop: 14,
  },
  abilitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  abilityBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  abilityText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },
  statsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  totalStatsText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3B82F6",
  },
});
