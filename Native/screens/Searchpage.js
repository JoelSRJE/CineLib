import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import GridBackground from "../components/GridBackground";
import { useEffect, useState } from "react";
import Fonts from "../constants/Fonts";
import searchData from "../api/SearchData";
import { useMessage } from "../context/MessageProvider";
import MediaCard from "../components/MediaCard";

export default function Searchpage() {
  const { showMessage } = useMessage();

  const [search, setSearch] = useState("");
  const [foundMedia, setFoundMedia] = useState([]);

  const searchMedia = async () => {
    try {
      if (!search.trim()) {
        setFoundMedia([]);
        return;
      }

      const media = await searchData({ searchWord: search.trim() });

      const results = media.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv",
      );

      setFoundMedia(results);

      if (results.length === 0) {
        showMessage("warning", `Couldn't find any media with: ${search}`);
      }
    } catch (error) {
      console.error("Error: ", error);
      showMessage("error", "Something went wrong while searching!");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMedia();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <View style={styles.container}>
      <GridBackground />

      <View style={styles.topSection}>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Search here.."
        />
      </View>

      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.mediaGrid}>
          {foundMedia.map((item) => (
            <MediaCard
              key={`${item.media_type}-${item.id}`}
              media={item}
              mediaType={item.media_type}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSection: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  input: {
    width: 260,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    fontFamily: Fonts.headingRegular,
    borderColor: "#6e6e6e",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },

  bottomSection: {
    flex: 1,
    alignItems: "center",
  },

  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 95,
    gap: 12,
  },
});
