import { StyleSheet, View, Text } from "react-native";
import Fonts from "../constants/Fonts";
import { useEffect, useState } from "react";

export default function Message({
  type,
  message,
  time = 3000,
  index = 0,
  onRemove,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove?.();
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [time, onRemove]);

  return (
    <View style={styles.container}>
      <View style={[styles.borderLeft, styles[type]]} />
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    maxWidth: 240,
    bottom: 40,
    right: 10,
    borderWidth: 1,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "#949494a1",
    backgroundColor: "#fff",
  },

  borderLeft: {
    width: 10,
    alignSelf: "stretch",
  },

  messageText: {
    fontSize: 18,
    fontFamily: Fonts.bodySemiBold,
    padding: 10,
  },

  success: {
    backgroundColor: "#589572",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  error: {
    backgroundColor: "#C62828",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  warning: {
    backgroundColor: "#D6A000",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
