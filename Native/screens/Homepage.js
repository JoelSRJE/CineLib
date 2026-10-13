import { StyleSheet, View, Text } from "react-native";
import GridBackground from "../components/GridBackground";

export default function Homepage() {
  return (
    <View style={styles.container}>
      <GridBackground />
      <Text>Homepage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
