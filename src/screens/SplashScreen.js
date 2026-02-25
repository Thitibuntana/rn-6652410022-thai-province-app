import { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../theme/colors";
import { provinceInfo } from "../data/province";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Map");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={provinceInfo.logo} style={styles.logo} />

      <Text style={styles.title}>เที่ยวไทย</Text>
      <Text style={styles.subtitle}>นครศรีธรรมราช</Text>

      <ActivityIndicator
        size="large"
        color={colors.white}
        style={styles.loader}
      />

      <Text style={styles.author}>
        6652410022 🔥🔥🔥🔥
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: colors.white,
    marginBottom: 30,
  },
  loader: {
    marginBottom: 40,
  },
  author: {
    position: "absolute",
    bottom: 40,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
});