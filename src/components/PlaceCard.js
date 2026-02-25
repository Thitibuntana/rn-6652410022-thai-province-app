import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import { colors } from "../theme/colors";

export default function PlaceCard({ place, onClose }) {
  if (!place) return null;

  const openMap = () => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`
    );
  };

  const callPhone = () => {
    if (!place.phone || place.phone === "-") return;
    Linking.openURL(`tel:${place.phone}`);
  };

  const renderValue = (val) => (val ? val : "-");

  const formatCategory = (text) => {
    if (!text) return "-";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <Pressable style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{ uri: place.image_url }}
            style={styles.image}
          />

          <View style={styles.header}>
            <Text style={styles.title}>{place.name}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.category}>
            {formatCategory(place.category)}
          </Text>

          <Text style={styles.text}>
            ที่อยู่: {renderValue(place.address)}
          </Text>

          <Text style={styles.text}>
            รายละเอียด: {renderValue(place.description)}
          </Text>

          <TouchableOpacity onPress={callPhone}>
            <Text style={styles.link}>
              เบอร์ติดต่อ: {renderValue(place.phone)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openMap}>
            <Text style={styles.link}>เปิดนำทางในแผนที่</Text>
          </TouchableOpacity>
        </ScrollView>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  card: {
    height: 550,
    backgroundColor: colors.lightGreen,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  close: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginLeft: 10,
  },
  category: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  link: {
    marginTop: 10,
    color: colors.primary,
    fontWeight: "bold",
  },
});