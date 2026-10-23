import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Share,
} from "react-native";
import Fonts from "../constants/Fonts";
import GridBackground from "../components/GridBackground";
import { HeartIcon, StarIcon } from "phosphor-react-native";
import getGenres from "../api/GetGenres";
import { useFavourite } from "../context/FavouriteProvider";
import CommentSection from "../components/CommentSection";

export default function CineDetailpage({ route }) {
  const { addOrRemoveFavourite } = useFavourite();
  const { media } = route.params;

  const [details, setDetails] = useState(media);
  const [genres, setGenres] = useState([]);

  const mediaType = route.params?.mediaType ?? "movie";

  useEffect(() => {
    async function loadGenres() {
      try {
        const genreNames = await getGenres(details.genre_ids, mediaType);

        setGenres(genreNames);
      } catch (error) {
        console.error("Failed to load genres: ", error);
      }
    }

    loadGenres();
  }, [details, mediaType]);

  const saveToFavourite = () => {
    addOrRemoveFavourite(details, mediaType);
  };

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>No media found..</Text>
      </View>
    );
  }

  const shareMedia = async () => {
    try {
      await Share.share({
        message: `Check out ${details.title || details.name} on CineLib! \n\n ${details.overview || ""}`,
        title: details.title || details.name,
      });
    } catch (error) {
      console.error("Failed to share media: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <GridBackground />

      <Text style={styles.screenTitle} accessibilityRole="header">
        {mediaType === "tv" ? "TV Serie" : "Movie"}
      </Text>

      {details && (
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.topSection}>
              <Pressable
                onPress={saveToFavourite}
                style={({ pressed }) => [
                  styles.favContainer,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Add it to favourite list"
              >
                <HeartIcon size={18} color="#fc4848" weight="fill" />
              </Pressable>
              <View style={styles.leftSide}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
                  }}
                  style={styles.poster}
                  contentFit="cover"
                  accessibilityLabel={`Poster for ${details.title || details.name}`}
                />
              </View>
              <View style={styles.rightSide}>
                <View style={styles.textField}>
                  <Text style={styles.title}>Title</Text>
                  <Text style={styles.info}>
                    {details.title || details.name}
                  </Text>
                </View>
                <View style={styles.textField}>
                  <Text style={styles.title}>Language</Text>
                  <Text style={styles.info}>
                    {details.original_language.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.textField}>
                  <Text style={styles.title}>Release Date</Text>
                  <Text style={styles.info}>
                    {details.release_date || "No release date available"}
                  </Text>
                </View>
                <View style={styles.textField}>
                  <Text style={styles.title}>Rating</Text>
                  <View style={styles.ratingWrapper}>
                    <View style={styles.ratingContainer}>
                      <StarIcon size={14} color="#e2c72d" weight="fill" />
                      <Text style={styles.info}>
                        {details.vote_average.toFixed(1)}
                      </Text>
                    </View>

                    <Text style={styles.info}>{details.vote_count}x voted</Text>
                  </View>

                  <View style={styles.textField}>
                    <Text style={styles.title}>Categories</Text>
                    <Text style={styles.info}>
                      {genres.length > 0
                        ? genres.join(", ")
                        : "Loading genres..."}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bottomSection}>
              <Text style={styles.descTitle} accessibilityRole="header">
                Description
              </Text>
              <Text style={styles.descText}>
                {details.overview || "No description available..."}
              </Text>
            </View>

            <Pressable
              onPress={shareMedia}
              style={({ pressed }) => [
                styles.shareButton,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Share this movie or series"
            >
              <Text style={styles.shareText}>Share</Text>
            </Pressable>

            <CommentSection media={media} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
  },

  screenTitle: {
    fontSize: 24,
    textAlign: "center",
    color: "#589572",
    fontFamily: Fonts.heading,
    letterSpacing: 0.5,
  },

  favContainer: {
    position: "absolute",
    top: 6,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    boxShadow: "0 2px 8px rgba(214, 214, 214, 0.8)",
    zIndex: 100,
  },

  contentContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    gap: 10,
    marginBottom: 120,
    width: "100%",
  },

  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#f1f1f1",
    padding: 8,
    boxShadow: "0 2px 8px rgba(214, 214, 214, 0.8)",
  },

  bottomSection: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#f1f1f1",
    boxShadow: "0 2px 8px rgba(214, 214, 214, 0.8)",
  },

  leftSide: {
    flex: 1,
    minWidth: 0,
  },

  rightSide: {
    flex: 1,
    minWidth: 0,
  },

  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(214, 214, 214, 0.8)",
  },

  textField: {
    flexDirection: "column",
  },

  title: {
    fontSize: 14,
    fontFamily: Fonts.headingMedium,
    letterSpacing: 1,
    marginTop: 4,
    lineHeight: 24,
    color: "#589572",
  },

  info: {
    fontSize: 15,
    fontFamily: Fonts.bodyBold,
    lineHeight: 24,
  },

  ratingWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  descTitle: {
    fontSize: 14,
    fontFamily: Fonts.headingMedium,
    letterSpacing: 1,
    marginTop: 4,
    lineHeight: 24,
    color: "#589572",
    paddingLeft: 8,
  },

  descText: {
    fontSize: 16,
    fontFamily: Fonts.bodySemiBold,
    letterSpacing: 0.4,
    lineHeight: 24,
    paddingBottom: 20,
    paddingHorizontal: 8,
  },

  pressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.5,
  },

  shareButton: {
    alignSelf: "center",
    backgroundColor: "#589572",
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    boxShadow: "0 2px 8px rgba(94, 94, 94, 0.8)",
  },

  shareText: {
    color: "#fff",
    fontFamily: Fonts.headingMedium,
    fontSize: 16,
  },
});
