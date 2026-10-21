import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import Fonts from "../constants/Fonts";
import CommentForm from "./forms/CommentForm";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { useMessage } from "../context/MessageProvider";
import getComments from "../api/GetComments";
import UpdateComment from "../api/UpdateComment";
import DeleteComment from "../api/DeleteComment";

export default function CommentSection({ media }) {
  const { user, authToken } = useAuth();
  const { showMessage } = useMessage();

  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const mediaType = media?.media_type ?? (media?.name ? "tv" : "movie");

  useEffect(() => {
    let isActive = true;

    async function fetchComments() {
      try {
        const data = await getComments({ authToken });

        if (isActive) {
          setComments(data);
        }
      } catch (error) {
        if (isActive) {
          console.error(error.message || "Could not load comments!");
          showMessage(
            "error",
            `Couldn't load comments for ${media.title || media.name}`,
          );
        }
      }
    }

    if (authToken && media?.id != null) {
      fetchComments();
    }

    return () => {
      isActive = false;
    };
  }, [authToken, media?.id, mediaType]);

  const mediaComments = comments.filter(
    (item) => item.mediaId === media?.id && item.mediaType === mediaType,
  );

  const handleCommentCreated = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleUpdateComment = async (commentId) => {
    if (!editedComment.trim()) {
      showMessage("warning", "Comment cannot be empty!");
      return;
    }

    try {
      const updatedComment = await UpdateComment({
        commentId,
        userId: user.userId,
        comment: editedComment.trim(),
        authToken,
      });

      setComments((prev) =>
        prev.map((item) =>
          item.commentId === commentId ? updatedComment : item,
        ),
      );

      setCommentId(null);
      setEditedComment("");

      showMessage("success", "Comment updated!");
    } catch (error) {
      showMessage("error", error.message || "Could not update comment!");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await DeleteComment({
        commentId,
        userId: user.userId,
        authToken,
      });

      setComments((prev) =>
        prev.filter((item) => item.commentId !== commentId),
      );

      showMessage("success", "Comment deleted!");
    } catch (error) {
      showMessage("error", error.message || "Could not delete comment!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>

      <View style={styles.commentForm}>
        <CommentForm media={media} commentCreated={handleCommentCreated} />
      </View>

      <ScrollView>
        {mediaComments.map((item) => (
          <View key={item.commentId} style={styles.commentCard}>
            <View style={styles.commentIdContainer}>
              <Text style={styles.commentId}>#{item.commentId}</Text>
            </View>

            <View style={styles.commentCreationContainer}>
              <Text style={styles.authorTitle}>
                Author: <Text style={styles.author}>{item.username}</Text>
              </Text>
              <Text style={styles.created}>{item.createdAt?.slice(0, 10)}</Text>
            </View>

            <View style={styles.border} />

            <View style={styles.commentContainer}>
              {commentId === item.commentId ? (
                <>
                  <TextInput
                    style={styles.editInput}
                    value={editedComment}
                    onChangeText={setEditedComment}
                    multiline
                    maxLength={500}
                  />

                  <View style={styles.actionRow}>
                    <Pressable
                      onPress={() => handleUpdateComment(item.commentId)}
                    >
                      <Text style={styles.actionText}>Save</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        setCommentId(null);
                        setEditedComment("");
                      }}
                    >
                      <Text style={styles.cancelText}>Cancel</Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <Text style={styles.comment}>{item.comment}</Text>
              )}

              {item.userId === user?.userId && commentId !== item.commentId && (
                <View style={styles.actionRow}>
                  <Pressable
                    onPress={() => {
                      setCommentId(item.commentId);
                      setEditedComment(item.comment);
                    }}
                  >
                    <Text style={styles.actionText}>Edit</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleDeleteComment(item.commentId)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        ))}

        {mediaComments.length === 0 && (
          <View style={styles.commentCard}>
            <Text style={styles.noComments}>
              No comments yet for {media.title || media.name}.
            </Text>
            <Text style={styles.noComments}>Add the first one?</Text>
          </View>
        )}
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

  noComments: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: Fonts.bodySemiBold,
    letterSpacing: 1,
    lineHeight: 30,
    color: "#589572",
  },

  editInput: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#589572",
    borderRadius: 8,
    padding: 10,
    fontFamily: Fonts.body,
    fontSize: 14,
    backgroundColor: "white",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 12,
  },

  actionText: {
    color: "#589572",
    fontFamily: Fonts.bodyBold,
  },

  cancelText: {
    color: "#535353",
    fontFamily: Fonts.bodySemiBold,
  },

  deleteText: {
    color: "#c0392b",
    fontFamily: Fonts.bodyBold,
  },
});
