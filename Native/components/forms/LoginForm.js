import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Fonts from "../../constants/Fonts";
import { useNavigation } from "@react-navigation/native";
import { LockIcon } from "phosphor-react-native";
import { useState } from "react";
import { LoginUser } from "../../api/LoginUser";
import { useAuth } from "../../context/AuthProvider";
import { useMessage } from "../../context/MessageProvider";

export default function LoginForm() {
  const { login } = useAuth();
  const { showMessage } = useMessage();

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const goTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email!");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password!");
      return;
    }

    try {
      setLoading(true);

      const data = await LoginUser({
        email: email.trim(),
        password,
      });

      login(data.user, data.token);

      setSuccessMessage("Login successful!");

      showMessage("success", "You've successfully logged in!");
      navigation.navigate("Home");
    } catch (error) {
      setErrorMessage("Failed to login!");
      showMessage("error", "Couldn't reach server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
        <LockIcon size={30} color="#589572" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
          placeholder="John@doe.com"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          placeholder="**********"
        />
      </View>

      <Pressable
        onPress={handleLogin}
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
          <Text style={styles.btnText}>Sign In</Text>
        )}
      </Pressable>

      {errorMessage ? (
        <Text
          style={{
            color: "red",
            textAlign: "center",
            fontSize: 16,
            fontFamily: Fonts.bodySemiBold,
          }}
        >
          {errorMessage}
        </Text>
      ) : null}

      {successMessage ? (
        <Text style={{ color: "#589572" }}>{successMessage}</Text>
      ) : null}

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
