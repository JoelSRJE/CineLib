import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LockIcon, NotePencilIcon } from "phosphor-react-native";
import CineLib from "../assets/Logo/CineLib-logo.png";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
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

  const goTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Pressable
          onPress={() => goTo("Home")}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <Image source={CineLib} style={styles.logo} contentFit="contain" />
        </Pressable>

        <View style={styles.buttonContainer}>
          {userOptions.map((option) => {
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
});
