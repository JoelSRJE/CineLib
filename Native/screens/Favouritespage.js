import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import GridBackground from "../components/GridBackground";
import { useFavourite } from "../context/FavouriteProvider";
import { useState } from "react";
import MediaCard from "../components/MediaCard";
import Fonts from "../constants/Fonts";

export default function Favouritespage() {
  const { favouriteList, isLoaded } = useFavourite();
  const [toggleView, setToggleView] = useState(true);

  const favouriteMovies = favouriteList.filter(
    (item) => item.mediaType === "movie",
  );

  const favouriteSeries = favouriteList.filter(
    (item) => item.mediaType === "tv",
  );

  const displayedFavourites = toggleView ? favouriteMovies : favouriteSeries;

  const title = toggleView ? "FAVOURITE MOVIES" : "FAVOURITE SERIES";

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <GridBackground />

        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#589572" />
          <Text style={styles.loadingText}>Loading CineLib...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GridBackground />
      <View style={styles.toggleContainer}>
        <Pressable
          style={[styles.toggleButton, toggleView && styles.activeButton]}
          onPress={() => setToggleView(true)}
          accessibilityRole="button"
          accessibilityLabel="See favourite movies"
          accessibilityState={{ selected: toggleView }}
        >
          <Text style={[styles.toggleText, toggleView && styles.activeText]}>
            Movies
          </Text>
        </Pressable>

        <Pressable
          style={[styles.toggleButton, !toggleView && styles.activeButton]}
          onPress={() => setToggleView(false)}
          accessibilityRole="button"
          accessibilityLabel="See favourite series"
          accessibilityState={{ selected: !toggleView }}
        >
          <Text style={[styles.toggleText, !toggleView && styles.activeText]}>
            Series
          </Text>
        </Pressable>
      </View>

      <View>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        <View style={styles.border} />
      </View>

      {displayedFavourites.length === 0 ? (
        <View style={styles.favContainer}>
          <Text style={styles.favText}>Looks empty in here...</Text>
          <Text style={styles.favText}>Add something to fill this page?</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.mediaGrid}>
            {displayedFavourites.map((item) => (
              <MediaCard
                key={`${item.mediaType}-${item.id}`}
                media={item}
                mediaType={item.mediaType}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },

  loadingContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#589572",
    fontFamily: Fonts.heading,
  },

  container: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    paddingTop: 10,
    color: "#589572",
    fontFamily: Fonts.heading,
    letterSpacing: 0.5,
  },

  border: {
    alignSelf: "center",
    width: "60%",
    height: 1.5,
    backgroundColor: "#53535352",
    marginHorizontal: 15,
    marginBottom: 8,
  },

  favContainer: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  favText: {
    fontSize: 18,
    fontFamily: Fonts.bodySemiBold,
  },

  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 12,
  },

  toggleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#589572",
    overflow: "hidden",
  },

  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  activeButton: {
    backgroundColor: "#589572",
  },

  toggleText: {
    fontSize: 16,
    fontFamily: Fonts.bodySemiBold,
    color: "#589572",
  },

  activeText: {
    color: "#fff",
  },
});
