import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Placeholder from "../assets/placeholder/placeholder.png";
import Fonts from "../constants/Fonts";
import { StarIcon, HeartIcon } from "phosphor-react-native";
import { useFavourite } from "../context/FavouriteProvider";
import { useNavigation } from "@react-navigation/native";

export default function MediaCard({ media, mediaType }) {
  const { addOrRemoveFavourite } = useFavourite();
  const navigation = useNavigation();

  const title = media.title ?? media.name;

  const saveToFavourite = () => {
    addOrRemoveFavourite(media, mediaType);
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Detail", {
          media,
          mediaType,
        })
      }
      style={styles.cardWrapper}
    >
      <View style={styles.cardContainer}>
        {media.poster_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${media.poster_path}`,
            }}
            style={styles.poster}
            contentFit="cover"
          />
        ) : (
          <View style={styles.noPoster}>
            <Image
              source={Placeholder}
              style={styles.poster}
              contentFit="contain"
            />
          </View>
        )}
      </View>

      <View style={styles.ratingContainer}>
        <StarIcon size={14} color="yellow" weight="fill" />
        <Text style={styles.rating}>{media.vote_average.toFixed(1)}</Text>
      </View>

      <Pressable onPress={saveToFavourite} style={styles.favContainer}>
        <HeartIcon size={14} color="#fc4848" weight="fill" />
      </Pressable>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: "48%",
  },

  cardContainer: {
    width: "100%",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
    borderRadius: 12,
  },

  poster: {
    width: "100%",
    height: 260,
    borderRadius: 12,
  },

  noPoster: {
    backgroundColor: "#fff",
    borderRadius: 12,
  },

  ratingContainer: {
    position: "absolute",
    top: 8,
    right: 4,
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

  favContainer: {
    position: "absolute",
    top: 8,
    left: 4,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },

  titleContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  title: {
    fontSize: 16,
    color: "#fff",
    padding: 6,
    fontFamily: Fonts.bodyBold,
    textAlign: "center",
  },
});
