import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AddEntry from "./components/AddEntry";

export default class App extends React.Component {
  componentDidMount() {
    console.log("Hello!");
    debugger;
    console.log("Bye!");
  }

  render() {
    return (
      <View>
        <Text>UdaciFitness</Text>
        <AddEntry />
      </View>
    );
  }
}
