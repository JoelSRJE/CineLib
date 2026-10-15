import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import GridBackground from "../components/GridBackground";
import NewsHero from "../components/NewsHero";
import Carousel from "../components/Carousel";
import Fonts from "../constants/Fonts";
import { useEffect, useState } from "react";
import getMovieData from "../api/GetData";

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [trendingWeekly, setTrendingWeekly] = useState([]);
  const [trendingDaily, setTrendingDaily] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          newMoviesData,
          moviesData,
          seriesData,
          trendingDataWeek,
          trendingDataDaily,
        ] = await Promise.all([
          getMovieData("/movie/now_playing"),
          getMovieData("/movie/popular"),
          getMovieData("/tv/popular"),
          getMovieData("/trending/all/week"),
          getMovieData("/trending/all/day"),
        ]);

        setNewMovies(newMoviesData.results);
        setPopularMovies(moviesData.results);
        setPopularSeries(seriesData.results);
        setTrendingWeekly(trendingDataWeek.results);
        setTrendingDaily(trendingDataDaily.results);
      } catch (error) {
        console.error("Could not load TMDB data: ", error);
        setErrorMessage(
          `${error}\n\nCouldn't get movie- or series data from database!`,
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <GridBackground />

        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#589572" />
          <Text style={styles.loadingText}>Loading CineLib...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <GridBackground />
      {/* Start: Hero Posters */}
      <View style={styles.carouselContainer}>
        <NewsHero newMovies={newMovies} errorMessage={errorMessage} />
      </View>
      {/* Start: Hero Posters */}

      {/* Start: Content Carousels 1 */}
      <View style={styles.carouselWrapper}>
        <Text style={styles.carouselTitle}>Popular Movies</Text>
        <Carousel media={popularMovies} errorMessage={errorMessage} />
      </View>

      <View style={styles.carouselWrapper}>
        <Text style={styles.carouselTitle}>Popular Series</Text>
        <Carousel media={popularSeries} errorMessage={errorMessage} />
      </View>
      {/* Slut: Content Carousels 1 */}

      {/* Start: Content Carousels 2 */}
      <View style={styles.carouselWrapper}>
        <Text style={styles.carouselTitle}>Trending Daily</Text>
        <Carousel media={trendingDaily} errorMessage={errorMessage} />
      </View>

      <View style={[styles.carouselWrapper, styles.space]}>
        <Text style={styles.carouselTitle}>Trending Weekly</Text>
        <Carousel media={trendingWeekly} errorMessage={errorMessage} />
      </View>
      {/* Slut: Content Carousels 2 */}

      {/* Start: Contact Us */}
      {/* Slut: Contact Us */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  carouselContainer: {
    flex: 1,
    marginTop: 10,
  },

  carouselTitle: {
    top: 20,
    left: 20,
    fontSize: 24,
    color: "#589572",
    fontFamily: Fonts.heading,
    letterSpacing: 0.6,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },

  loadingContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#589572",
    fontFamily: Fonts.heading,
  },

  space: {
    marginBottom: 90,
  },
});
