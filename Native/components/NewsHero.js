import { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Image,
  Pressable,
} from "react-native";
import {
  StarIcon,
  CaretCircleLeftIcon,
  CaretCircleRightIcon,
} from "phosphor-react-native";
import Fonts from "../constants/Fonts";

export default function NewsHero({ newMovies, errorMessage }) {
  const { width } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const movies = (newMovies ?? []).slice(0, 10);

  const scrollToMovie = (index) => {
    if (index < 0 || index >= movies.length) return;

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    setActiveIndex(index);
  };

  if (errorMessage) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{errorMessage}</Text>
        <Text style={styles.loadingText}>Component: NewsHero</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={movies}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            {item.poster_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.poster, styles.noPoster]}>
                <Text>No poster available!</Text>
              </View>
            )}

            <View style={styles.releaseContainer}>
              <Text style={styles.releaseText}>In Theaters</Text>
            </View>

            <View style={styles.ratingContainer}>
              <StarIcon size={16} color="yellow" weight="fill" />
              <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
            </View>

            <View style={styles.navigationControls}>
              <Pressable
                onPress={() => scrollToMovie(activeIndex - 1)}
                disabled={activeIndex === 0}
                style={styles.arrowButton}
              >
                <CaretCircleLeftIcon
                  size={60}
                  color={activeIndex === 0 ? "#888888d0" : "#FFFFFF"}
                  weight="fill"
                />
              </Pressable>

              <Pressable
                onPress={() => scrollToMovie(activeIndex + 1)}
                disabled={activeIndex === movies.length - 1}
                style={styles.arrowButton}
              >
                <CaretCircleRightIcon
                  size={60}
                  color={
                    activeIndex === movies.length - 1 ? "#888888d0" : "#FFFFFF"
                  }
                  weight="fill"
                />
              </Pressable>
            </View>
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);

          setActiveIndex(index);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  slide: {
    position: "relative",
    alignItems: "center",
    padding: 16,
    height: 700,
  },

  poster: {
    position: "absolute",
    width: "100%",
    height: 700,
    borderRadius: 12,
  },

  noPoster: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
  },

  releaseContainer: {
    position: "absolute",
    top: 10,
    left: 28,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },

  releaseText: {
    fontSize: 16,
    fontFamily: Fonts.headingMedium,
    color: "#FFFFFF",
  },

  ratingContainer: {
    position: "absolute",
    top: 10,
    right: 28,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },

  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  navigationControls: {
    position: "absolute",
    top: "50%",
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    transform: [{ translateY: -20 }],
    index: 100,
  },

  arrowButton: {
    padding: 4,
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
});
