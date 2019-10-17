import React from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { white, gray, purple } from "./../utils/colors";

const UdaciStepper = ({ max, unit, step, value, onIncrement, onDecrement }) => {
  return (
    <View style={(styles.row, { justifyContent: "space-between" })}>
      <View style={{ flexDirection: "row" }}>
        {Platform.OS === "ios" ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={onDecrement}
              style={[styles.btniOS, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
            >
              <FontAwesome name="minus" size={30} color={purple} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onIncrement}
              style={[styles.btniOS, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
            >
              <FontAwesome name="plus" size={30} color={purple} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={onDecrement}
              style={[styles.btnAnd, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
            >
              <Entypo name="minus" size={30} color={purple} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onIncrement}
              style={[styles.btnAnd, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
            >
              <Entypo name="plus" size={30} color={purple} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.metricCounter}>
          <Text style={{ fontSize: 24, textAlign: "center" }}>{value}</Text>
          <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
        </View>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  btniOS: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  btnAnd: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
    color: white
  },
  metricCounter: {
    width: 80,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default UdaciStepper;
