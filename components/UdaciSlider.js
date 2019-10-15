import React from "react";
import { View, Slider, Text } from "react-native";

const UdaciSlider = ({ max, step, unit, value, onChange }) => {
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
};

export default UdaciSlider;
