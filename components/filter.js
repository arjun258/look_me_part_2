import React from "react";
import { Image, View } from "react-native";

const Filter = ({
  face: {
    bounds: {
      size: { width: faceWidth, height: faceHeight }
    },
    LEFT_EYE,
    RIGHT_EYE,
    NOSE_BASE
  },
  source,
  width,
  height,
  left,
  right,
  top
}) => {
  const filterWidth = faceWidth * width;
  const filterHeight = faceHeight * height;

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
        left: LEFT_EYE.x - filterWidth * left,
        right: RIGHT_EYE.x - filterWidth * right,
        top: NOSE_BASE.y - filterHeight * top
      }}
    >
      <Image
        source={source}
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

export default Filter;