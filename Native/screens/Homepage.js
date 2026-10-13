import { ScrollView, StyleSheet, Text, View } from "react-native";
import GridBackground from "../components/GridBackground";
import NewsHero from "../components/NewsHero";
import Carousel from "../components/Carousel";
import Fonts from "../constants/Fonts";
import { useEffect, useState } from "react";
import getMovieData from "../api/GetData";

export default function Homepage() {
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [trending, setTrending] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          newMoviesData,
          moviesData,
          seriesData,
          trendingData,
          movieGenresData,
          seriesGenreData,
        ] = await Promise.all([
          getMovieData("/movie/now_playing"),
          getMovieData("/movie/popular"),
          getMovieData("/tv/popular"),
          getMovieData("/trending/all/week"),
          getMovieData("/genre/movie/list"),
          getMovieData("/genre/tv/list"),
        ]);

        setNewMovies(newMoviesData.results);
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

  return (
    <ScrollView style={styles.container}>
      <GridBackground />
      {/* Start: Hero Posters */}
      <View style={styles.carouselContainer}>
        <NewsHero newMovies={newMovies} />
      </View>
      {/* Start: Hero Posters */}

      {/* Start: Content Carousels 1 */}
      <View style={styles.carouselWrapper}>
        <Text style={styles.carouselTitle}>Popular Movies</Text>
        <Carousel media={popularMovies} />
      </View>

      <View style={styles.carouselWrapper}>
        <Text style={styles.carouselTitle}>Popular Series</Text>
        <Carousel media={popularSeries} />
      </View>
      {/* Slut: Content Carousels 1 */}

      {/* Start:  */}
      {/* Slut:  */}

      {/* Start: Content Carousels 2 */}
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
});
