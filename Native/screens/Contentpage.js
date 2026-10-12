import { StyleSheet, View, Text } from "react-native";

export default function Contentpage() {
  return (
    <View style={styles.container}>
      <Text>Content Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
