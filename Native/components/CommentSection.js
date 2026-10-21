import { StyleSheet, View, Text, ScrollView } from "react-native";
import Fonts from "../constants/Fonts";
import CommentForm from "./forms/CommentForm";

export default function CommentSection({ media }) {
  const comments = [
    {
      id: 1,
      author: "Joel",
      comment: "bla bla bla bla bla",
      createdAt: "2026-10-20",
    },
    {
      id: 2,
      author: "Test User",
      comment: "Lorem Ipsum Dolor sit amet...",
      createdAt: "2026-10-18",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>

      <View style={styles.commentForm}>
        <CommentForm media={media} />
      </View>

      <ScrollView>
        {comments.map((item) => (
          <View key={item.id} style={styles.commentCard}>
            <View style={styles.commentIdContainer}>
              <Text style={styles.commentId}>#{item.id}</Text>
            </View>

            <View style={styles.commentCreationContainer}>
              <Text style={styles.authorTitle}>
                Author: <Text style={styles.author}>{item.author}</Text>
              </Text>
              <Text style={styles.created}>{item.createdAt}</Text>
            </View>

            <View style={styles.border} />

            <View style={styles.commentContainer}>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 20,
    fontFamily: Fonts.headingMedium,
    textDecorationLine: "underline",
    lineHeight: 24,
    marginTop: 10,
    color: "#589572",
  },

  commentForm: {
    marginVertical: 20,
  },

  commentCard: {
    flexDirection: "column",
    backgroundColor: "rgb(255, 255, 255, 0.6)",
    padding: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },

  commentIdContainer: {
    position: "absolute",
    left: 4,
    top: 4,
  },

  commentId: {
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
    letterSpacing: 0.5,
  },

  commentCreationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 10,
    fontSize: 14,
  },

  authorTitle: {
    fontFamily: Fonts.bodySemiBold,
    letterSpacing: 0.5,
  },

  author: {
    fontSize: 16,
    fontFamily: Fonts.bodySemiBold,
    color: "#589572",
    letterSpacing: 0.5,
  },

  border: {
    height: 2,
    backgroundColor: "#53535352",
    marginHorizontal: 15,
  },

  created: {
    fontSize: 15,
    fontFamily: Fonts.bodySemiBold,
    fontStyle: "italic",
    color: "#589572",
  },

  commentContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  comment: {
    fontSize: 14,
    fontFamily: Fonts.body,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
});
