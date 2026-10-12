import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LockIcon, NotePencilIcon } from "phosphor-react-native";
import CineLib from "../assets/Logo/CineLib-logo.png";

export default function Header() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={CineLib} style={styles.logo} contentFit="contain" />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <LockIcon size={30} />
          </Pressable>
          <Pressable style={styles.button}>
            <NotePencilIcon size={30} />
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "col",
  },

  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 1,
  },

  logo: {
    width: 70,
    height: 70,
    tintColor: "#589572",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },

  button: {
    padding: 3,
    borderWidth: 1.5,
    borderRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.8)",
  },

  bottomBorder: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#53535352",
    marginHorizontal: 15,
  },
});
