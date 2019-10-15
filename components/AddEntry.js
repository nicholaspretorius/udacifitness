import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { getMetricMetaInfo, timeToString, getDailyReminderValue } from "../utils/helpers";
import { submitEntry, removeEntry } from "./../utils/api";
import UdaciSlider from "./UdaciSlider";
import UdaciStepper from "./UdaciStepper";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";
import { addEntry } from "./../actions";

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
};

class AddEntry extends Component {
  state = {
    run: 5,
    bike: 10,
    swim: 10,
    sleep: 10,
    eat: 3
  };

  // only for run, bike, swim steppers
  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    const { step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] - step;

      return {
        ...state,
        [metric]: count <= 0 ? 0 : count
      };
    });
  };

  // only for sliders
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }));
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    // Update Redux
    const { dispatch } = this.props;
    dispatch(
      addEntry({
        [key]: entry
      })
    );

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }));

    // Navigate to home
    // Save to 'DB'
    submitEntry(key, entry);
    // Clear local notification
  };

  reset = () => {
    const key = timeToString();

    // update Redux
    const { dispatch } = this.props;
    dispatch(
      addEntry({
        [key]: getDailyReminderValue()
      })
    );
    // route to home
    // update 'DB'
    removeEntry(key);
  };

  render() {
    const info = getMetricMetaInfo();
    const today = new Date(Date.now()).toLocaleDateString();

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy" size={100} />
          <Text>You already logged your info for today.</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }

    return (
      <View>
        <Text>{JSON.stringify(this.state)}</Text>
        <DateHeader date={today} />
        {Object.keys(info).map(key => {
          const { getIcon, type, ...rest } = info[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === "slider" ? (
                <UdaciSlider
                  value={value}
                  onChange={value => {
                    this.slide(key, value);
                  }}
                  {...rest}
                />
              ) : (
                <UdaciStepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined"
  };
}

export default connect(mapStateToProps)(AddEntry);
