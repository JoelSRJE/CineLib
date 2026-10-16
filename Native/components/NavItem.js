import { StyleSheet, Text, Pressable, View } from "react-native";
import Fonts from "../constants/Fonts";

export default function NavItem({ item, onPress }) {
  const Icon = item.icon;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Icon size={30} color="#589572" />

      {item.count !== undefined && (
        <View style={styles.count}>
          <Text style={styles.countText}>{item.count}</Text>
        </View>
      )}

      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 14,
    fontFamily: Fonts.headingMedium,
    color: "#589572",
  },

  pressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.5,
  },

  count: {
    position: "absolute",
    top: -2,
    right: 20,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: "#589572",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#589572",
  },

  countText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: Fonts.bodySemiBold,
    textAlign: "center",
  },
});
