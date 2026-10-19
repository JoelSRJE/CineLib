import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import GridBackground from "../components/GridBackground";
import { useAuth } from "../context/AuthProvider";
import Fonts from "../constants/Fonts";
import { useEffect, useState } from "react";
import { useMessage } from "../context/MessageProvider";
import updateUser from "../api/UpdateUser";

export default function Userpage() {
  const { user, authToken, updateUserData } = useAuth();
  const { showMessage } = useMessage();

  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  useEffect(() => {
    setUsername(user?.username ?? "");
    setEmail(user?.email ?? "");
  }, [user?.username, user?.email]);

  const editActivated = () => {
    setIsEditable(true);
    showMessage("warning", "Edit mode activated!");
  };

  const saveUpdates = async () => {
    try {
      const updatedUser = await updateUser({
        userId: user?.userId,
        username,
        email,
        authToken,
      });

      updateUserData(updatedUser);

      setIsEditable(false);
      setUsername(updatedUser.username);
      setEmail(updatedUser.email);

      showMessage(
        "success",
        `Successfully updated user: ${updatedUser.username}`,
      );
    } catch (error) {
      console.error("Failed to update user: ", error);

      showMessage("error", `Failed to update user: ${user?.username}`);
      setIsEditable(true);
    }
  };

  return (
    <View style={styles.container}>
      <GridBackground />

      <View style={styles.userInfoContainer}>
        <View>
          <Text style={styles.title}>User Information</Text>
          <View style={styles.border} />
        </View>

        <View style={styles.userFieldContainer}>
          <Text style={styles.userTitle}>USER ID</Text>
          <TextInput
            value={user?.userId}
            style={[styles.userInput, styles.disabled]}
            editable={false}
          />
        </View>

        <View style={styles.userFieldContainer}>
          <Text style={styles.userTitle}>USERNAME</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={[styles.userInput, !isEditable && styles.disabled]}
            editable={isEditable}
          />
        </View>

        <View style={styles.userFieldContainer}>
          <Text style={styles.userTitle}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={[styles.userInput, !isEditable && styles.disabled]}
            editable={isEditable}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.userFieldContainer}>
          <Text style={styles.userTitle}>Account Type</Text>
          <TextInput
            value={user?.accountType}
            style={[styles.userInput, styles.disabled]}
            editable={false}
          />
        </View>

        <View style={styles.userBtnWrapper}>
          <View style={styles.border} />
          <View style={styles.userBtnContainer}>
            <Pressable
              onPress={editActivated}
              style={({ pressed }) => [
                styles.userBtn,
                isEditable && styles.buttonDisabled,
                pressed && styles.pressed,
              ]}
              disabled={isEditable}
            >
              <Text
                style={[styles.buttonText, isEditable && styles.disabledText]}
              >
                Edit
              </Text>
            </Pressable>
            <Pressable
              onPress={saveUpdates}
              style={({ pressed }) => [
                styles.userBtn,
                !isEditable && styles.buttonDisabled,
                pressed && styles.pressed,
              ]}
              disabled={!isEditable}
            >
              <Text
                style={[styles.buttonText, !isEditable && styles.disabledText]}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userInfoContainer: {
    justifyContent: "center",
    gap: 8,
  },

  userInfoTopSection: {},

  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 50,
    fontFamily: Fonts.heading,
    color: "#589572",
  },

  border: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#53535352",
    marginHorizontal: 15,
    marginBottom: 20,
  },

  userFieldContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 95,
  },

  userTitle: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    justifyContent: "flex-start",
    width: "100%",
    letterSpacing: 0.5,
  },

  userInput: {
    borderWidth: 1,
    borderColor: "#589572",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 220,
    fontSize: 16,
    backgroundColor: "rgba(14, 170, 82, 0.2)",
  },

  userBtnWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    marginTop: 40,
  },

  userBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },

  userBtn: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderColor: "#589572",
    borderRadius: 8,
  },

  buttonDisabled: {
    borderColor: "#999999",
    backgroundColor: "rgba(194, 194, 194, 0.5)",
  },

  buttonText: {
    color: "#222222",
    fontFamily: Fonts.bodyBold,
  },

  disabledText: {
    color: "#777777",
  },

  disabled: {
    borderColor: "#555555",
    backgroundColor: "rgba(194, 194, 194, 0.5)",
  },

  pressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.5,
  },
});
