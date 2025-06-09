import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useAuthStore } from "../store/useAuthStore"; // atau sesuaikan path-nya

// Check ENV
// import { API_URL, SECRET_KEY } from "@env";

// console.log(API_URL);
const API_KEY = process.env.EXPO_PUBLIC_API_CRYPTO_API_KEY;

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(API_KEY, "    INI APINYA ===>");

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      console.log(result, " this is the result ===>");
      setLoggedIn(result);
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Welcome to the App!</Text>
      </View>
      <View style={styles.buttons}>
        <Link
          href={"/login"}
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Login In
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "#fff" },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ color: "black", fontSize: 22, fontWeight: "500" }}>
              {" "}
              Sign up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});

export default Page;
