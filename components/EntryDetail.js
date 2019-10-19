import React, { Component } from "react";
import { View, Text } from "react-native";
import { purple, white } from "./../utils/colors";

class EntryDetail extends Component {
  state = {};
  static navigationOptions = ({ navigation }) => {
    const date = navigation.getParam("entryId");
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8);
    return {
      title: `Entry for ${year}/${month}/${day}`,
      headerStyle: {
        backgroundColor: purple
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: "normal"
      }
    };
  };

  render() {
    return (
      <View>
        <Text>EntryDetail - {this.props.navigation.state.params.entryId}</Text>
      </View>
    );
  }
}

export default EntryDetail;
