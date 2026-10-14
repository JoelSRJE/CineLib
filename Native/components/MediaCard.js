import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";

export default function MediaCard({ media }) {
  const title = media.title ?? media.name;

  return (
    <View style={styles.cardWrapper}>
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
          <View style={[styles.poster, styles.noPoster]}>
            <Text>Ingen bild tillgänglig</Text>
          </View>
        )}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
  },

  title: {
    position: "absolute",
    color: "white",
    marginTop: 8,
    fontSize: 14,
  },
});
