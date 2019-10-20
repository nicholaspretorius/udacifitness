import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Constants from "expo-constants";

import reducer from "./reducers";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";
import { purple, white } from "./utils/colors";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const store = createStore(reducer);

const Tabs = createBottomTabNavigator(
  {
    History: {
      screen: History
    },
    AddEntry: {
      screen: AddEntry
    },
    Live: {
      screen: Live
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "History") {
          iconName = `ios-bookmarks`;
        } else if (routeName === "AddEntry") {
          iconName = `ios-add`;
        } else if (routeName === "Live") {
          iconName = `ios-speedometer`;
        }
        return <IconComponent name={iconName} size={30} color={tintColor} />;
      }
    }),
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      inactiveTintColor: "gray",
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: `rgba(0, 0, 0, 0.24)`,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: Tabs,
    Details: EntryDetail
  },
  {
    initialRouteName: "Home"
  }
);

const Navigation = createAppContainer(MainNavigator);

class App extends React.Component {
  componentDidMount() {
    console.log("Hello!");
    debugger;
    console.log("Bye!");
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <Navigation />
        </View>
      </Provider>
    );
  }
}

export default App;
