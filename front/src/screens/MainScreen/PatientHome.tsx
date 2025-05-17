import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const PatientHomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [carbonSaved, setCarbonSaved] = useState(12.53);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.co2Container}>
          <Text style={styles.co2Value}>{carbonSaved.toFixed(2)}</Text>
          <Text style={styles.co2Label}>kg CO2 절감</Text>
        </View>
        <TouchableOpacity style={styles.profileIcon}>
          <Icon name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Polar Bear Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/smile.png")}
          style={styles.polarBear}
          resizeMode="contain"
        />
      </View>

      {/* Mission Section */}
      <View style={styles.missionContainer}>
        <Text style={styles.missionTitle}>새로운 미션!</Text>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <ScrollView showsVerticalScrollIndicator={true}>
            <Image
              source={require("../../assets/images/banner1.png")}
              style={styles.bannerImage}
            />
            <Image
              source={require("../../assets/images/banner2.png")}
              style={styles.bannerImage}
            />
          </ScrollView>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemCenter}>
          <Icon name="scan" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#F8F9FB",
  },
  header: {
    backgroundColor: "#D0E8FF",
    padding: 50,

    position: "relative",
    alignItems: "center",
  },
  co2Container: {
    alignItems: "center",
  },
  co2Value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7DD7",
  },
  co2Label: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  profileIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  polarBear: {
    width: 200,
    height: 150,
  },
  missionContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    alignContent: "center",
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bannerImage: {
    width: width * 0.8,
    height: 120,
    borderRadius: 12,

    marginBottom: 10,
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#444",
  },
  tabItemCenter: {
    backgroundColor: "#2E7DD7",
    padding: 16,
    borderRadius: 40,
    marginBottom: 20,
  },
});

export default PatientHomeScreen;
