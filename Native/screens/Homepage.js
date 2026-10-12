import { StyleSheet, View, Text } from "react-native";
import Header from "../components/Header";

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Homepage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
