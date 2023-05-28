import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Filter from '../components/filter'

const data = {
  Crown: [
    { id: "crown-pic1", src: require("../assets/crown-pic1.png") },
    { id: "crown-pic2", src: require("../assets/crown-pic2.png") },
    { id: "crown-pic3", src: require("../assets/crown-pic3.png") }
  ],
  Flowers: [
    { id: "flower-pic1", src: require("../assets/flower-pic1.png") },
    { id: "flower-pic2", src: require("../assets/flower-pic2.png") },

  ],

};

const filters = {
  "crown-pic1": {
    src: require("../assets/crown-pic1.png"),
    width: 3.5,
    height: 0.7,
    left: 0.46,
    right: 0.15,
    top: 1.5
  },
  "crown-pic2": {
    src: require("../assets/crown-pic2.png"),
    width: 3.5,
    height: 1.2,
    left: 0.46,
    right: 0.15,
    top: 0.7
  },
  "crown-pic3": {
    src: require("../assets/crown-pic3.png"),
    width: 2,
    height: 0.6,
    left: 0.36,
    right: 0.15,
    top: 1.5
  },
  "flower-pic1": {
    src: require("../assets/flower-pic1.png"),
    width: 1.5,
    height: 0.55,
    left: 0.36,
    right: 0.15,
    top: 1.5
  },
  "flower-pic2": {
    src: require("../assets/flower-pic2.png"),
    width: 1.2,
    height: 0.55,
    left: 0.36,
    right: 0.15,
    top: 1.3
  },
  
};

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
      current_filter: "crown-pic1",
      current_category: "Crown"
    };

    this.onFacesDetected = this.onFacesDetected.bind(this);
  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onFacesDetected({ faces }) {
    this.setState({ faces: faces });
  }

  render() {
    var { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.upperContainer}>
          <View style={{flexDirection:"row", flexWrap:"wrap"}}>
          <Text style={styles.appName1}>Look </Text>
          <Text style={styles.appName2}> Me....</Text>
          </View>
          <View style={{flexDirection:"row",flexWrap:"wrap"}}>
          <Text style = {styles.appSubName1}>Try Our </Text>
          <Text style = {styles.appSubName2}>Cute Filters </Text>
          </View>
        </View>

        <View style={styles.middleContainer}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map(face => (
            <Filter
              key={`face-id-${face.faceID}`}
              face={face}
              source={filters[this.state.current_filter].src}
              width={filters[this.state.current_filter].width}
              height={filters[this.state.current_filter].height}
              left={filters[this.state.current_filter].left}
              right={filters[this.state.current_filter].right}
              top={filters[this.state.current_filter].top}
            />
          ))}
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.lowerTopContainer}>
            <ScrollView
              contentContainerStyle={styles.categories}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Object.keys(data).map(categoryName => (
                <TouchableOpacity
                  key={`category-button-${categoryName}`}
                  style={[
                    styles.category,
                    {
                      backgroundColor:
                        this.state.current_category === categoryName ? "#FFA384" : "#E7F2F8"
                    }
                  ]}
                  onPress={() =>
                    this.setState({
                      current_category: categoryName,
                      
                    })
                  }
                >
                  <Text>{categoryName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.lowerBottomContainer}>
            <ScrollView
              contentContainerStyle={styles.filters}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {data[this.state.current_category].map(filter_data => {
                return (
                  <TouchableOpacity
                    key={`filter-button-${filter_data.id}`}
                    style={[
                      styles.filterButton,
                      {
                        borderColor:
                          this.state.current_filter === filter_data.id
                            ? "#FFA384"
                            : "#FFFF"
                      }
                    ]}
                    onPress={() =>
                      this.setState({
                        current_filter: `${filter_data.id}`
                      })
                    }
                  >
                    <Image
                      source={filter_data.src}
                      style={styles.filterImage}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F2F8"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  upperContainer: {
    flex: 0.13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7F2F8",
    flexDirection: "column",
    backgroundColor:"#6278e4"
  },
  appName1: {
    color: "#FFA384",
    fontSize: RFValue(25),
    fontWeight: "800",
    fontStyle: "italic",
  },
  appName2:{
    color: "red",
    fontSize: RFValue(25),
    fontWeight: "800",
    fontStyle: "italic",
  },
  appSubName1:{
    color: "#FFA384",
    fontSize: RFValue(20),
    fontWeight: "800",
    fontStyle: "italic",
  },
  appSubName2:{
    color: "pink",
    fontSize: RFValue(20),
    fontWeight: "800",
    fontStyle: "italic",
  },

  middleContainer: { flex: 0.67 },
  lowerContainer: {
    flex: 0.2,
    backgroundColor: "#E7F2F8"
  },
  lowerTopContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  categories: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  category: {
    width: RFValue(80),
    height: "70%",
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: RFValue(5),
    borderWidth: 2
  },
  lowerBottomContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFE7BC"
  },
  filters: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  filterButton: {
    height: RFValue(70),
    width: RFValue(70),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(35),
    backgroundColor: "#E7F2F8",
    borderWidth: 5,
    marginRight: RFValue(20),
    marginBottom: RFValue(10)
  },
  filterImage: {
    height: "60%",
    width: "60%",
    alignSelf: "center",
    resizeMode: "contain"
  },

});