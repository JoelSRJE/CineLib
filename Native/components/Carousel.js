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

export default function Carousel({ media }) {
  const { width } = useWindowDimensions();

  const visibleMovies = width >= 600 ? 3 : 2;
  const cardWidth = width / visibleMovies;

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const movies = media;

  const scrollToMovie = (index) => {
    if (index < 0 || index >= movies.length) return;

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <FlatList
          ref={flatListRef}
          data={movies}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth}
          decelerationRate="fast"
          keyExtractor={(item) => String(item.id)}
          getItemLayout={(_, index) => ({
            length: cardWidth,
            offset: cardWidth * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width: cardWidth }]}>
              {item.poster_path ? (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.poster}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.poster, styles.noPoster]}>
                  <Text>Ingen bild tillgänglig</Text>
                </View>
              )}

              <View style={styles.ratingContainer}>
                <StarIcon size={16} color="yellow" weight="fill" />
                <Text style={styles.rating}>
                  {item.vote_average.toFixed(1)}
                </Text>
              </View>
            </View>
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / cardWidth,
            );

            setActiveIndex(index);
          }}
        />

        <View style={styles.navigationControls}>
          <Pressable
            onPress={() => scrollToMovie(activeIndex - 1)}
            disabled={activeIndex === 0}
            style={styles.arrowButton}
          >
            <CaretCircleLeftIcon
              size={40}
              color={activeIndex === 0 ? "#888888d0" : "#FFFFFF"}
              weight="fill"
            />
          </Pressable>

          <Pressable
            onPress={() => scrollToMovie(activeIndex + 1)}
            disabled={activeIndex >= movies.length - 1}
            style={styles.arrowButton}
          >
            <CaretCircleRightIcon
              size={40}
              color={activeIndex >= movies.length - 1 ? "#888888d0" : "#FFFFFF"}
              weight="fill"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },

  slide: {
    position: "relative",
    alignItems: "center",
    paddingHorizontal: 6,
    height: 300,
  },

  poster: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },

  noPoster: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
  },

  ratingContainer: {
    position: "absolute",
    top: 8,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },

  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  carouselWrapper: {
    position: "relative",
  },

  navigationControls: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },

  arrowButton: {
    padding: 4,
  },
});
