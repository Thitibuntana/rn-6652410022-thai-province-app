import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../config/supabase";
import PlaceCard from "../components/PlaceCard";
import { colors } from "../theme/colors";
import { provinceInfo } from "../data/province";

const { height } = Dimensions.get("window");

export default function MapScreen() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mapRef = useRef(null);
  const sidebarAnim = useRef(new Animated.Value(-240)).current;
  const cardAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    fetchPlaces();
  }, []);

  useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarOpen ? 10 : -240,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (sidebarOpen) setSelectedPlace(null);
  }, [sidebarOpen]);

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: selectedPlace ? height - 400 : height,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedPlace]);

  const fetchPlaces = async () => {
    const { data } = await supabase.from("places").select("*");
    setPlaces(data || []);
  };

  const getMarkerColor = (category) => {
    switch (category) {
      case "tourist":
        return "#2E7D32";
      case "restaurant":
        return "#EF6C00";
      case "cafe":
        return "#6D4C41";
      case "temple":
        return "#6A1B9A";
      case "festival":
        return "#C62828";
      default:
        return "#1B5E20";
    }
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case "tourist":
        return "สถานที่ท่องเที่ยว";
      case "restaurant":
        return "ร้านอาหาร";
      case "cafe":
        return "คาเฟ่ / ของหวาน";
      case "temple":
        return "วัด / ศาสนสถาน";
      case "festival":
        return "งานประเพณี";
      default:
        return "อื่น ๆ";
    }
  };

  const groupByCategory = () => {
    const grouped = {};
    places.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  const handleSelectPlace = (place) => {
    setSidebarOpen(false);
    setSelectedPlace(place);

    mapRef.current?.animateToRegion({
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const groupedPlaces = groupByCategory();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>
          เที่ยวไทย: {provinceInfo.name}
        </Text>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: provinceInfo.lat,
          longitude: provinceInfo.lng,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        onPress={() => setSelectedPlace(null)}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            pinColor={getMarkerColor(place.category)}
            onPress={() => handleSelectPlace(place)}
          />
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setSidebarOpen(!sidebarOpen)}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.keys(groupedPlaces).map((category) => (
            <View key={category}>
              <Text style={styles.categoryTitle}>
                {getCategoryTitle(category)}
              </Text>

              {groupedPlaces[category].map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.sidebarItem,
                    { borderColor: getMarkerColor(category) },
                  ]}
                  onPress={() => handleSelectPlace(item)}
                >
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.sidebarImage}
                  />
                  <Text style={styles.sidebarText}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.View
        style={[styles.cardContainer, { top: cardAnim }]}
      >
        {selectedPlace && (
          <PlaceCard
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    borderBottomWidth: 2,
    borderColor: colors.border,
  },

  logo: {
    position: "absolute",
    left: 15,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  map: { flex: 1 },

  menuButton: {
    position: "absolute",
    top: 90,
    left: 15,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },

  menuText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  sidebar: {
    position: "absolute",
    top: 130,
    bottom: 30,
    width: 230,
    backgroundColor: "#E8F5E9",
    borderRadius: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  categoryTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 8,
  },

  sidebarItem: {
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
    padding: 6,
    backgroundColor: "#fff",
  },

  sidebarImage: {
    width: 170,
    height: 100,
    borderRadius: 10,
  },

  sidebarText: {
    marginTop: 6,
    fontSize: 13,
    textAlign: "center",
  },

  cardContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 400,
  },
});