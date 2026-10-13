import { StyleSheet, View, Text } from "react-native";
import GridBackground from "../components/GridBackground";

export default function Contentpage() {
  return (
    <View style={styles.container}>
      <GridBackground />

      <Text>Content Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
