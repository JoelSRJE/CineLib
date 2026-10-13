import { View, StyleSheet } from "react-native";

export default function GridBackground() {
  return (
    <View style={styles.grid} pointerEvents="none">
      {Array.from({ length: 16 }, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: 8 }, (_, col) => (
            <View key={col} style={styles.cell} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 4,
  },

  row: {
    flex: 1,
    flexDirection: "row",
  },

  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#589572",
    opacity: 0.25,
  },
});
