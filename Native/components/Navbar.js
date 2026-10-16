import { StyleSheet, Text, View } from "react-native";
import {
  FilmReelIcon,
  FilmStripIcon,
  HeartIcon,
  UserIcon,
} from "phosphor-react-native";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import NavItem from "./NavItem";
import { useAuth } from "../context/AuthProvider";
import { useFavourite } from "../context/FavouriteProvider";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const { favouriteList } = useFavourite();

  const navigation = useNavigation();

  if (!isLoggedIn) {
    return null;
  }

  const favouriteCount =
    favouriteList.length > 9 ? "9+" : String(favouriteList.length);

  const navItems = [
    {
      id: 1,
      name: "Movies",
      screen: "Content",
      mediaType: "movie",
      icon: FilmReelIcon,
    },
    {
      id: 2,
      name: "Series",
      screen: "Content",
      mediaType: "tv",
      icon: FilmStripIcon,
    },

    {
      id: 3,
      name: "Favs",
      screen: "Favs",
      icon: HeartIcon,
      count: favouriteCount,
    },
    {
      id: 4,
      name: "User",
      screen: "User",
      icon: UserIcon,
    },
  ];

  const goTo = (item) => {
    if (item.mediaType) {
      navigation.navigate(item.screen, {
        mediaType: item.mediaType,
      });
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <BlurView intensity={90} tint="prominent" style={styles.navbarContainer}>
      {navItems.map((item, index) => (
        <View key={item.id} style={styles.navItemContainer}>
          {index === navItems.length - 2 && (
            <Text style={styles.separator}>|</Text>
          )}

          <NavItem item={item} onPress={() => goTo(item)} />
        </View>
      ))}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    height: 65,
    borderWidth: 1,
    borderColor: "rgba(88, 149, 114, 0.9)",
    borderRadius: 50,
    backgroundColor: "rgba(221, 221, 221, 1)",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 20,
    right: 16,
    left: 16,
  },

  navItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  separator: {
    position: "absolute",
    right: 50,
    bottom: 4,
    fontSize: 40,
    color: "rgba(156, 156, 156, 0.4)",
  },
});
