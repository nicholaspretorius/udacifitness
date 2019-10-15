import React from "react";
import { Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";
import AddEntry from "./components/AddEntry";

const store = createStore(reducer);

export default class App extends React.Component {
  componentDidMount() {
    console.log("Hello!");
    debugger;
    console.log("Bye!");
  }

  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>UdaciFitness</Text>
          <AddEntry />
        </View>
      </Provider>
    );
  }
}
