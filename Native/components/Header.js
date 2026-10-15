import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import {
  LockIcon,
  NotePencilIcon,
  MagnifyingGlassIcon,
  SignOutIcon,
} from "phosphor-react-native";
import CineLib from "../assets/Logo/CineLib-logo.png";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthProvider";
import Fonts from "../constants/Fonts";

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();

  const navigation = useNavigation();
  const userOptions = [
    {
      id: 1,
      name: "Login",
      screen: "Login",
      icon: LockIcon,
    },
    {
      id: 2,
      name: "Register",
      screen: "Register",
      icon: NotePencilIcon,
    },
  ];

  const logoutOption = [
    {
      id: 1,
      name: "Logout",
      icon: SignOutIcon,
    },
  ];

  const goTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Landing");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Pressable
            onPress={() => {
              {
                isLoggedIn ? goTo("Home") : goTo("Landing");
              }
            }}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <Image source={CineLib} style={styles.logo} contentFit="contain" />
          </Pressable>

          {isLoggedIn ? (
            <Pressable style={styles.searchBtn}>
              <Text>
                <MagnifyingGlassIcon size={24} />
              </Text>
            </Pressable>
          ) : null}

          <View style={styles.usernameContainer}>
            <Text style={styles.username}>Welcome {user?.username}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {!isLoggedIn
            ? userOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <Pressable
                    key={option.id}
                    onPress={() => goTo(option.screen)}
                    style={({ pressed }) => [
                      styles.button,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Icon size={30} />
                  </Pressable>
                );
              })
            : logoutOption.map((option) => {
                const Icon = option.icon;

                return (
                  <Pressable
                    key={option.id}
                    onPress={handleLogout}
                    style={({ pressed }) => [
                      styles.button,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Icon size={30} />
                  </Pressable>
                );
              })}
        </View>
      </View>

      <View style={styles.bottomBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "col",
  },

  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 1,
  },

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  searchBtn: {
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    padding: 8,
    borderColor: "rgba(0, 0, 0, 0.8)",
  },

  logo: {
    width: 70,
    height: 70,
    tintColor: "#589572",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },

  button: {
    padding: 3,
    borderWidth: 1.5,
    borderRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.8)",
  },

  bottomBorder: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#53535352",
    marginHorizontal: 15,
  },

  pressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.5,
  },

  usernameContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },

  username: {
    fontSize: 16,
    fontFamily: Fonts.headingMedium,
  },
});
