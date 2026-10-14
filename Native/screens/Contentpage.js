import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import GridBackground from "../components/GridBackground";
import { useEffect, useState } from "react";
import getMovieData from "../api/GetData";
import Fonts from "../constants/Fonts";
import MediaCard from "../components/MediaCard";

export default function Contentpage({ route }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [displayedMedia, setDisplayedMedia] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const mediaType = route.params?.mediaType ?? "movie";

  const endpoint = mediaType === "movie" ? "/movie/popular" : "/tv/popular";

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setErrorMessage(null);
      setDisplayedMedia([]);
      setPage(1);
      setTotalPages(1);

      try {
        const data = await getMovieData(endpoint, 1);

        setDisplayedMedia(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Could not load TMDB data: ", error);
        setErrorMessage("Couldn't get movie- or series data from database!");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [mediaType]);

  async function loadMore() {
    if (isLoading || isLoadingMore || page >= totalPages) {
      return;
    }

    const nextPage = page + 1;

    setIsLoadingMore(true);
    setLoadMoreError(null);

    try {
      const data = await getMovieData(endpoint, nextPage);

      setDisplayedMedia((prev) => [...prev, ...data.results]);
      setPage(nextPage);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Could not load more media: ", error);
      setLoadMoreError("Couldn't load more titles. Try again!");
    } finally {
      setIsLoadingMore(false);
    }
  }

  if (isLoading) {
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

  if (errorMessage) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GridBackground />

      <View>
        <Text style={styles.title}>
          {mediaType === "movie" ? "MOVIES" : "SERIES"}
        </Text>
        <View style={styles.border} />
      </View>

      <ScrollView>
        <View style={styles.mediaGrid}>
          {displayedMedia.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </View>

        <View style={styles.moreBtnContainer}>
          {loadMoreError && (
            <Text style={styles.loadingText}>{loadMoreError}</Text>
          )}

          {page < totalPages && (
            <Pressable
              style={({ pressed }) => [
                styles.moreBtn,
                pressed && styles.pressed,
              ]}
              onPress={loadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <ActivityIndicator color="#589572" />
              ) : (
                <Text style={styles.moreText}>Show more</Text>
              )}
            </Pressable>
          )}

          {page >= totalPages && (
            <Text style={styles.loadingText}>No more titles to load.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  loadingText: {
    fontSize: 18,
    color: "#589572",
    fontFamily: Fonts.heading,
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

  moreBtnContainer: {
    paddingBottom: 120,
  },

  moreBtn: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#589572",
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.2)",
  },

  moreText: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    color: "#589572",
  },

  pressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.5,
    backgroundColor: "#589572",
  },
});
