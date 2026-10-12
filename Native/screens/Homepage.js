import { StyleSheet, View, Text } from "react-native";

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Text>Homepage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
