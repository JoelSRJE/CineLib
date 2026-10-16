import { StyleSheet, View, Text, Animated } from "react-native";
import Fonts from "../constants/Fonts";
import { useEffect, useRef } from "react";

export default function Message({ type, message, time = 3000, onRemove }) {
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.timing(progress, {
      toValue: 0,
      duration: time,
      useNativeDriver: false,
    });

    anim.start();

    const timer = setTimeout(() => {
      onRemove?.();
    }, time);

    return () => {
      anim.stop();
      clearTimeout(timer);
    };
  }, [time, progress]);

  return (
    <View style={styles.messageWrapper}>
      <View style={styles.messageContainer}>
        <View style={[styles.borderLeft, styles[type]]} />
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <View style={styles.progress}>
        <Animated.View
          style={[
            styles.progressBar,
            styles[type],
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

export function MessageList({ messages, onRemove }) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <View style={styles.listContainer} pointerEvents="box-none">
      {messages.map((item) => (
        <Message
          key={item.id}
          type={item.type}
          message={item.message}
          time={item.time}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    alignSelf: "flex-end",
    maxWidth: 280,
  },

  progress: {
    height: 4,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  progressBar: {
    height: "100%",
  },

  listContainer: {
    position: "absolute",
    bottom: 100,
    right: 10,
    alignItems: "flex-end",
    gap: 10,
    zIndex: 1000,
  },

  messageContainer: {
    flexDirection: "row",
    maxWidth: 280,
    borderWidth: 1,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderColor: "#949494a1",
    backgroundColor: "#fff",
    overflow: "hidden",
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
  },

  error: {
    backgroundColor: "#C62828",
  },

  warning: {
    backgroundColor: "#D6A000",
  },
});
