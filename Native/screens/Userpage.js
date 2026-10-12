import { StyleSheet, View, Text } from "react-native";

export default function Userpage() {
  return (
    <View style={styles.container}>
      <Text>User Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
