import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  require("../../assets/images/anxious.png"),
  require("../../assets/images/smile.png"),
];

const getImageIndex = (carbonSaved: number) => {
  return carbonSaved < 10 ? 0 : 1;
};

const PatientHome: React.FC = () => {
  const [carbonSaved, setCarbonSaved] = useState(12.34);
  const scrollRef = useRef<ScrollView>(null);

  const formattedValue = carbonSaved
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 이미지 전환 스크롤 트리거
  useEffect(() => {
    const index = getImageIndex(carbonSaved);
    scrollRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  }, [carbonSaved]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerCurve}>
        <View style={styles.carbonRow}>
          <Text style={styles.levelText}>{formattedValue}</Text>

          <TouchableOpacity onPress={() => setCarbonSaved((prev) => prev + 1)}>
            <Text style={styles.button}>＋</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCarbonSaved((prev) => Math.max(prev - 1, 0))}
          >
            <Text style={styles.button}>－</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subText}>kg CO₂ 절감</Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        style={{ flexGrow: 0 }}
      >
        {images.map((imgSrc, idx) => (
          <Image key={idx} source={imgSrc} style={styles.polarBearImage} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientHome;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F6FD",
  },
  headerCurve: {
    backgroundColor: "#CCE5FF",
    width: "100%",
    height: width * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  levelText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 4,
  },
  carbonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  button: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  polarBearImage: {
    width: width,
    height: Platform.OS === "ios" ? width * 0.7 : width * 0.8,
    resizeMode: "contain",
  },
});
