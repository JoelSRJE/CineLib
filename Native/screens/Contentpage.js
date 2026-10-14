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
  const [isLoading, setIsLoading] = useState(true);
  const [displayedMedia, setDisplayedMedia] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const mediaType = route.params?.mediaType ?? "movie";

  const endpoint = mediaType === "movie" ? "/movie/popular" : "/tv/popular";

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await getMovieData(endpoint);

        setDisplayedMedia(data.results);
      } catch (error) {
        console.error("Could not load TMDB data: ", error);
        setErrorMessage("Couldn't get movie- or series data from database!");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [mediaType]);

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

      <ScrollView>
        <View style={styles.mediaGrid}>
          {displayedMedia.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </View>

        <View style={styles.moreBtnContainer}>
          <Pressable style={styles.moreBtn}>
            <Text style={styles.moreText}>Show more</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#589572",
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.2)",
  },

  moreText: {
    fontSize: 22,
    fontFamily: Fonts.bodyBold,
    color: "#589572",
  },
});
