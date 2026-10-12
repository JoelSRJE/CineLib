import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
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

import { useEffect, useState } from "react";

import getMovieData from "./api/GetData";

import Homepage from "./screens/Homepage";
import Loginpage from "./screens/Loginpage";
import Registerpage from "./screens/Registerpage";
import Favouritespage from "./screens/Favouritespage";
import Contentpage from "./screens/Contentpage";
import Userpage from "./screens/Userpage";
import CineDetailpage from "./screens/CineDetailpage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [trending, setTrending] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [loaded, error] = useFonts({
    "Rubik-Regular": Rubik_400Regular,
    "Rubik-Medium": Rubik_500Medium,
    "Rubik-Bold": Rubik_700Bold,
    "NunitoSans-Regular": NunitoSans_400Regular,
    "NunitoSans-SemiBold": NunitoSans_600SemiBold,
    "NunitoSans-Bold": NunitoSans_700Bold,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [
          moviesData,
          seriesData,
          trendingData,
          movieGenresData,
          seriesGenreData,
        ] = await Promise.all([
          getMovieData("/movie/popular"),
          getMovieData("/tv/popular"),
          getMovieData("/trending/all/week"),
          getMovieData("/genre/movie/list"),
          getMovieData("/genre/tv/list"),
        ]);

        setPopularMovies(moviesData.results);
        setPopularSeries(seriesData.results);
        setTrending(trendingData.results);
        setMovieGenres(movieGenresData.results);
        setSeriesGenres(seriesGenreData);
      } catch (error) {
        console.error("Could not load TMDB data: ", error);
        setErrorMessage("Couldn't get movie- and series data from database!");
      }
    }

    loadData();
  }, []);

  if (error) {
    throw error;
  }

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Loginpage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Registerpage}
          options={{ headerShown: false }}
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

      <Navbar isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
