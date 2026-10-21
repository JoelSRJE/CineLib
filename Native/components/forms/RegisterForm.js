import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Fonts from "../../constants/Fonts";
import { NotePencilIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import RegisterUser from "../../api/RegisterUser";
import { useMessage } from "../../context/MessageProvider";

export default function RegisterForm() {
  const navigation = useNavigation();

  const { showMessage } = useMessage();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const goTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!username.trim() || !email.trim() || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await RegisterUser({
        username: username.trim(),
        email: email.trim(),
        password,
      });

      setSuccessMessage("Your account was created successfully!");
      showMessage("success", "Account created, please sign in!");

      setUsername("");
      setEmail("");
      setPassword("");
      navigation.navigate("Login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Register</Text>
        <NotePencilIcon size={30} color="#589572" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          editable={!loading}
          placeholder="Choose a username"
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
          placeholder="Enter your email"
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          placeholder="Choose a password"
        ></TextInput>
      </View>

      <Pressable
        onPress={handleRegister}
        disabled={loading}
        style={({ pressed }) => [
          styles.submitBtn,
          pressed && styles.pressed,
          loading && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#589572" />
        ) : (
          <Text style={styles.btnText}>Register</Text>
        )}
      </Pressable>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <View style={styles.registerInfoContainer}>
        <Text style={styles.registerInfoText}>Got an account already?</Text>
        <Pressable onPress={() => goTo("Login")}>
          <Text style={styles.registerBtnText}>Sign In</Text>
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

  disabled: {
    opacity: 0.6,
  },

  errorText: {
    color: "#c62828",
    fontFamily: Fonts.body,
  },

  successText: {
    color: "#2e7d32",
    fontFamily: Fonts.body,
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
