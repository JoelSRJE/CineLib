import { StyleSheet, View } from "react-native";
import LoginForm from "../components/forms/LoginForm";
import GridBackground from "../components/GridBackground";

export default function Loginpage() {
  return (
    <View style={styles.container}>
      <GridBackground />
      <View style={styles.loginWrapper}>
        <LoginForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loginWrapper: {
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: 6,
    marginBottom: 20,
  },
});
