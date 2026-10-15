import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";

import { useState } from "react";

import Homepage from "./screens/Homepage";
import Loginpage from "./screens/Loginpage";
import Registerpage from "./screens/Registerpage";
import Favouritespage from "./screens/Favouritespage";
import Contentpage from "./screens/Contentpage";
import Userpage from "./screens/Userpage";
import CineDetailpage from "./screens/CineDetailpage";
import Landingpage from "./screens/Landingpage";
import { AuthProvider } from "./context/AuthProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  const dots = Array.from({ length: 120 }, (_, index) => index);

  const [loaded, error] = useFonts({
    "Rubik-Regular": Rubik_400Regular,
    "Rubik-Medium": Rubik_500Medium,
    "Rubik-Bold": Rubik_700Bold,
    "NunitoSans-Regular": NunitoSans_400Regular,
    "NunitoSans-SemiBold": NunitoSans_600SemiBold,
    "NunitoSans-Bold": NunitoSans_700Bold,
  });

  if (error) {
    throw error;
  }

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <View style={styles.container}>
        <View style={styles.dotGrid} pointerEvents="none">
          {dots.map((dot) => (
            <View key={dot} style={styles.dot} />
          ))}
        </View>

        <NavigationContainer>
          <Header />
          <Stack.Navigator>
            <Stack.Screen
              name="Landing"
              component={Landingpage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Homepage}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={Loginpage}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Register"
              component={Registerpage}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Content"
              component={Contentpage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favs"
              component={Favouritespage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="User"
              component={Userpage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={CineDetailpage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>

          <Navbar />
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  dotGrid: {
    position: "absolute",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignContent: "flex-start",
    paddingTop: 20,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#589572",
    opacity: 0.2,
    margin: 14,
  },
});
