import React from "react";
import { Image, View } from "react-native";

const Filter1 = ({
  face: {
    bounds: {
      size: { width: faceWidth, height: faceHeight }
    },
    LEFT_EYE,
    RIGHT_EYE,
    NOSE_BASE
  }
}) => {
  const filterWidth = faceWidth * 3.5;
  const filterHeight = faceHeight * 0.7;

  const transformAngle = (
    angleRad = Math.atan(
      (RIGHT_EYE.y - LEFT_EYE.y) /
        (RIGHT_EYE.x - LEFT_EYE.x)
    )
  ) => (angleRad * 180) / Math.PI;

  return (
    <View
      style={{
        position: "absolute",
        left: LEFT_EYE.x - filterWidth * 0.46,
        right: RIGHT_EYE.x - filterWidth * 0.15,
        top: NOSE_BASE.y - filterHeight * 1.5
      }}
    >
      <Image
        source={require("../assets/crown-pic1.png")}
        style={{
          width: filterWidth,
          height: filterHeight,
          resizeMode: "contain",
          transform: [{ rotate: `${transformAngle()}deg` }]
        }}
      />
    </View>
  );
};

export default Filter1;