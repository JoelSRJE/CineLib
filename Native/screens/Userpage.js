import { StyleSheet, View, Text } from "react-native";
import GridBackground from "../components/GridBackground";

export default function Userpage() {
  return (
    <View style={styles.container}>
      <GridBackground />

      <Text>User Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
