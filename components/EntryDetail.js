import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import MetricCard from "./MetricCard";
import TextButton from "./TextButton";
import { addEntry } from "./../actions";
import { removeEntry } from "./../utils/api";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
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

  reset = () => {
    const { remove, goBack, entryId } = this.props;
    remove();
    goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  render() {
    const { metrics, entryId } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{ margin: 20 }}>
          Reset {entryId}
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
});

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params;

  return {
    entryId,
    metrics: state[entryId]
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { entryId } = navigation.state.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        })
      ),
    goBack: () => navigation.goBack()
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetail);
