import { StyleSheet, View, Text, TextInput } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import Fonts from "../../constants/Fonts";

export default function CommentForm() {
  const { user } = useAuth();

  const todaysDate = new Date().toLocaleDateString("sv-SE");

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Author: </Text>
          <Text style={styles.author}>{user?.username}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Date: </Text>
          <Text style={styles.date}>{todaysDate}</Text>
        </View>
      </View>

      <View style={styles.border} />

      <View style={styles.bottomSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Comment</Text>
          <TextInput
            style={styles.input}
            editable={true}
            placeholder="Write here.."
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "rgb(255, 255, 255, 0.6)",
    padding: 8,
    marginBottom: 20,
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },

  border: {
    height: 2,
    backgroundColor: "#53535352",
    marginHorizontal: 15,
    marginVertical: 10,
  },

  bottomSection: {
    flexDirection: "column",
    padding: 8,
  },

  infoContainer: {
    flexDirection: "row",
  },

  inputContainer: {
    flexDirection: "column",
  },

  label: {
    fontFamily: Fonts.bodySemiBold,
    letterSpacing: 0.5,
  },

  author: {
    fontSize: 16,
    fontFamily: Fonts.bodySemiBold,
    color: "#589572",
    letterSpacing: 0.5,
  },

  date: {
    fontSize: 15,
    fontFamily: Fonts.bodySemiBold,
    fontStyle: "italic",
    color: "#589572",
  },
});
