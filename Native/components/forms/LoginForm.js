import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import Fonts from "../../constants/Fonts";
import { useNavigation } from "@react-navigation/native";
import { LockIcon } from "phosphor-react-native";

export default function LoginForm() {
  const navigation = useNavigation();

  const goTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
        <LockIcon size={30} color="#589572" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input}></TextInput>
      </View>

      <Pressable
        style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
      >
        {({ pressed }) => (
          <Text style={[styles.btnText, pressed && styles.btnTextPressed]}>
            Sign In
          </Text>
        )}
      </Pressable>

      <View style={styles.registerInfoContainer}>
        <Text style={styles.registerInfoText}>No account yet?</Text>
        <Pressable onPress={() => goTo("Register")}>
          <Text style={styles.registerBtnText}>Create one here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    borderWidth: 2,
    borderColor: "#53535352",
    borderRadius: 6,
    gap: 8,
    backgroundColor: "#fff",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },

  title: {
    fontSize: 24,
    fontFamily: Fonts.headingMedium,
    color: "#589572",
    textAlign: "center",
  },

  inputContainer: {
    justifyContent: "center",
  },

  label: {
    fontSize: 20,
    fontFamily: Fonts.body,
  },

  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#589572",
    width: "220",
  },

  submitBtn: {
    marginTop: 12,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#589572",
    width: 200,
  },

  btnText: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    color: "#589572",
  },

  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.7,
    backgroundColor: "#589572",
    color: "#fff",
  },

  btnTextPressed: {
    color: "#fff",
  },

  registerInfoContainer: {
    marginTop: 8,
    flexDirection: "row",
    gap: 3,
  },

  registerInfoText: {
    fontSize: 14,
    fontFamily: Fonts.body,
  },

  registerBtnText: {
    fontSize: 13,
    color: "#589572",
    fontFamily: Fonts.bodyBold,
  },
});
