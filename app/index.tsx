import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokemonCard } from "../src/components/PokemonCard";
import { SearchBar } from "../src/components/SearchBar";
import {
  fetchPokemonBasicDetails,
  fetchPokemonList,
  fetchPokemonsByType,
} from "../src/services/pokeApi";
import { PokemonBasicDetails } from "../src/types/pokemon";

const PAGE_SIZE = 20;

export default function Index() {
  const [pokemons, setPokemons] = useState<PokemonBasicDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const loadPokemons = useCallback(
    async (reset: boolean = false) => {
      if (loading) return;
      if (!reset && !hasMore) return;

      setLoading(true);
      const currentOffset = reset ? 0 : offset;

      const newPokemons = await fetchPokemonList(PAGE_SIZE, currentOffset);

      if (newPokemons.length < PAGE_SIZE) {
        setHasMore(false);
      }

      setPokemons((prev) => (reset ? newPokemons : [...prev, ...newPokemons]));
      setOffset(currentOffset + PAGE_SIZE);
      setLoading(false);
      setRefreshing(false);
    },
    [offset, loading, hasMore]
  );

  // Load initial pokemons
  useEffect(() => {
    loadPokemons(true);
  }, []);

  // Handle Type Filter Selection via PokéAPI
  useEffect(() => {
    if (selectedType !== null) {
      setLoading(true);
      fetchPokemonsByType(selectedType).then((typePokemons) => {
        setPokemons(typePokemons);
        setLoading(false);
      });
    } else {
      setOffset(0);
      setHasMore(true);
      loadPokemons(true);
    }
  }, [selectedType]);

  const handleRefresh = () => {
    setRefreshing(true);
    if (selectedType !== null) {
      fetchPokemonsByType(selectedType).then((typePokemons) => {
        setPokemons(typePokemons);
        setRefreshing(false);
      });
    } else {
      setHasMore(true);
      setOffset(0);
      loadPokemons(true);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore && searchQuery === "" && selectedType === null) {
      loadPokemons(false);
    }
  };

  // Direct API lookup if search query is entered and not in memory
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.trim().toLowerCase();
      const exists = pokemons.some(
        (p) => p.name.toLowerCase().includes(q) || String(p.id) === q
      );

      if (!exists) {
        fetchPokemonBasicDetails(q).then((singleResult) => {
          if (singleResult) {
            setPokemons((prev) => {
              if (prev.some((p) => p.id === singleResult.id)) return prev;
              return [singleResult, ...prev];
            });
          }
        });
      }
    }
  }, [searchQuery]);

  // Filter pokemons based on search query
  const filteredPokemons = pokemons.filter((pokemon) => {
    if (searchQuery.trim() === "") return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(q) || String(pokemon.id).includes(q)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key="grid-2-columns"
        numColumns={2}
        data={filteredPokemons}
        keyExtractor={(item) => `${item.id}-${item.name}`}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tidak ada Pokémon yang ditemukan.</Text>
            </View>
          )
        }
        ListFooterComponent={
          loading && pokemons.length > 0 ? (
            <ActivityIndicator size="small" color="#3B82F6" style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  columnWrapper: {
    gap: 12,
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },
});
