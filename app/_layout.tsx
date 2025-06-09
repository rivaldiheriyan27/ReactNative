import Colors from "@/constants/Colors";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// const InitialLayout = () => {
//   const checkIsAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const [loaded, error] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//     ...FontAwesome.font,
//   });
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const router = useRouter();

//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) return null;

//   // Hide splash screen when fonts are loaded
//   useEffect(() => {
//     const prepare = async () => {
//       if (loaded) {
//         await SplashScreen.hideAsync();

//         const isAuth = await checkIsAuthenticated();
//         if (isAuth) {
//           router.replace("/(authenticated)/(tabs)/home");
//         } else {
//           router.replace("/");
//         }

//         setCheckingAuth(false); // mark auth check done
//       }
//     };

//     prepare();
//   }, [loaded]);

//   // Show loading screen while fonts or auth are being checked
//   if (!loaded || checkingAuth) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen
//         name="signup"
//         options={{
//           title: "",
//           headerBackTitle: "",
//           headerShadowVisible: false,
//           headerStyle: { backgroundColor: Colors.background },
//           headerLeft: () => (
//             <TouchableOpacity onPress={router.back}>
//               <Ionicons name="arrow-back" size={24} color={Colors.dark} />
//             </TouchableOpacity>
//           ),
//         }}
//       />

//       <Stack.Screen
//         name="login"
//         options={{
//           title: "",
//           headerBackTitle: "",
//           headerShadowVisible: false,
//           headerStyle: { backgroundColor: Colors.background },
//           headerLeft: () => (
//             <TouchableOpacity onPress={router.back}>
//               <Ionicons name="arrow-back" size={24} color={Colors.dark} />
//             </TouchableOpacity>
//           ),
//           headerRight: () => (
//             <Link href={"/help"} asChild>
//               <TouchableOpacity onPress={router.back}>
//                 <Ionicons
//                   name="help-circle-outline"
//                   size={24}
//                   color={Colors.dark}
//                 />
//               </TouchableOpacity>
//             </Link>
//           ),
//         }}
//       />

//       <Stack.Screen
//         name="help"
//         options={{ title: "Help", presentation: "modal" }}
//       />

//       <Stack.Screen
//         name="verify/[phone]"
//         options={{
//           title: "",
//           headerBackTitle: "",
//           headerShadowVisible: false,
//           headerStyle: { backgroundColor: Colors.background },
//           headerLeft: () => (
//             <TouchableOpacity onPress={router.back}>
//               <Ionicons name="arrow-back" size={34} color={Colors.dark} />
//             </TouchableOpacity>
//           ),
//         }}
//       />

//       <Stack.Screen
//         name="(authenticated)/(tabs)"
//         options={{ headerShown: false }}
//       />
//     </Stack>
//   );
// };

const InitialLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  // Hooks dipanggil secara stabil
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Tangani error font
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (!fontsLoaded) return;

      try {
        const auth = await isAuthenticated();
        console.log("✅ Auth status:", auth);

        // Navigasi setelah root siap
        setTimeout(() => {
          if (auth) {
            router.replace("/(authenticated)/(tabs)/home");
          } else {
            router.replace("/"); // bisa diganti ke /login kalau mau
          }
        }, 0);
      } catch (e) {
        console.error("❌ Auth error:", e);
        // router.replace("/error"); // atau halaman fallback lainnya
      } finally {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!fontsLoaded || !appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Setelah siap, tampilkan stack navigasi
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={24} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={24} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={"/help"} asChild>
              <TouchableOpacity>
                <Ionicons
                  name="help-circle-outline"
                  size={24}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="help"
        options={{ title: "Help", presentation: "modal" }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <InitialLayout />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default RootLayoutNav;
