import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuthStore } from "@/store/useAuthStore";
// import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
const Page = () => {
  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  // const { signUp } = useSignUp();

  const onSignup = async () => {
    try {
      // const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      // //     const { supportedFirstFactors } = await signIn!.create({
      // //       identifier: fullPhoneNumber,
      // //     });
      // //     const firstPhoneFactor: any = supportedFirstFactors.find(
      // //       (factor: any) => {
      // //         return factor.strategy === "phone_code";
      // //       }
      // //     );
      // //     const { phoneNumberId } = firstPhoneFactor;
      // //     await signIn!.prepareFirstFactor({
      // //       strategy: "phone_code",
      // //       phoneNumberId,
      // //     });
      // // Kirim ke API backend untuk login
      // const response = await fetch("http://localhost:3009/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: "rivalheiryan@gmail.com", // ganti ini sesuai input phoneNumber kalau sudah support nomor
      //   }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   Alert.alert("Login gagal", data?.message || "Terjadi kesalahan.");
      //   return;
      // }

      // const { token, email } = data;

      // // Simpan token di zustand
      // const { setToken } = useAuthStore.getState();
      // setToken(token);

      // Arahkan ke halaman verifikasi dan kirim token jika mau
      router.push({
        pathname: "/verify/[phone]",
        params: {
          phone: "087769733764",
          email: "rivalheriyan", // opsional
        },
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignup}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default Page;
