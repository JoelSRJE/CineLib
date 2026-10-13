import { StyleSheet, View, Text, Pressable } from "react-native";
import GridBackground from "../components/GridBackground";
import CineLib from "../assets/Logo/CineLib-logo.png";
import { Image } from "expo-image";

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <GridBackground />

      {/* Start: Landing Page Content */}
      <View style={styles.contentContainer}>
        <Image source={CineLib} style={styles.logo} contentFit="contain" />

        <Text style={styles.title}>Welcome to CineLib</Text>

        <Text style={styles.description}>
          Discover movies, explore ratings, and find your next favorite film.
        </Text>

        {/* Start: Login&Register Buttons  */}
        <Pressable
          style={({ pressed }) => [
            styles.registerBtn,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerBtnText}>Register Account</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.loginBtn, pressed && styles.pressed]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginBtnText}>Sign In</Text>
        </Pressable>
        {/* Slut: Login&Register Buttons */}
      </View>
      {/* Slut: Landing Page Content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 60,
  },

  logo: {
    width: 140,
    height: 140,
    tintColor: "#589572",
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 36,
    maxWidth: 300,
  },

  registerBtn: {
    width: "100%",
    backgroundColor: "#589572",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },

  registerBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginBtn: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#589572",
    alignItems: "center",
  },

  loginBtnText: {
    color: "#589572",
    fontSize: 16,
    fontWeight: "bold",
  },

  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.7,
    backgroundColor: "#589572",
    color: "#fff",
  },
});
