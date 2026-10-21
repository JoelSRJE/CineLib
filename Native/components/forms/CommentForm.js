import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import Fonts from "../../constants/Fonts";
import { useState } from "react";
import { useMessage } from "../../context/MessageProvider";

export default function CommentForm({ media }) {
  const { showMessage } = useMessage();
  const { user } = useAuth();
  const todaysDate = new Date().toLocaleDateString("sv-SE");

  const [author, setAuthor] = useState(user?.username);
  const [date, setDate] = useState(todaysDate);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) {
      // Shouldn't render at all because of .trim check but you never know..
      showMessage("warning", "Can't post an empty comment!");
      return;
    }

    console.log("Comment: ", comment.trim());

    setComment("");
    showMessage("success", `Posted comment on: ${media.title || media.name} `);
  };

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
            value={comment}
            onChangeText={setComment}
            multiline
            maxLength={500}
            placeholder="Write here.."
            textAlignVertical="top"
          />
        </View>
        <Text style={styles.lettersCount}>{comment.length}/500</Text>
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={!comment.trim()}
        style={({ pressed }) => [
          styles.submitBtn,
          !comment.trim() && styles.disabledBtn,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.submitText}>Post Comment</Text>
      </Pressable>
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

  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    fontFamily: Fonts.body,
    color: "#222",
    backgroundColor: "rgba(255,255,255,0.8)",
  },

  lettersCount: {
    alignSelf: "flex-end",
    marginTop: 4,
    fontSize: 12,
    color: "#535353",
    fontFamily: Fonts.body,
  },

  submitBtn: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#589572",
    borderRadius: 8,
  },

  submitText: {
    color: "#fff",
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
  },

  disabledBtn: {
    opacity: 0.4,
  },

  pressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.5,
  },
});
