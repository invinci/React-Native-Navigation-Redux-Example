import React, { Component } from "react";
import { Platform, AppRegistry } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import * as reducers from "./reducers/index";
import * as appActions from "./actions/index";
import thunk from "redux-thunk";
import {
  registerScreensNew,
  registerScreenVisibilityListener
} from "./components/screens";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
// registerScreens(store, Provider);
registerScreensNew(store, Provider);
registerScreenVisibilityListener();

export default class App extends Component {
  constructor(props) {
    super(props);
    store.subscribe(this.onStoreUpdate.bind(this));
    this.name = "ravi";
    // store.dispatch(appActions.appInitialized());
    if (this.name === "ravi") {
      store.dispatch(appActions.login());
    } else {
      store.dispatch(appActions.appInitialized());
    }

    // screen related book keeping
  }

  componentDidMount() {
    this.props.dispatch(appActions.login());
  }

  onStoreUpdate() {
    let { root } = store.getState().root;
    console.log(store.getState());

    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    const tabs = [
      {
        label: "Navigation",
        // screen: "example.Types",
        screen: "example.Types.ListScreen",
        icon: require("./img/list.png"),
        title: "Navigation Types"
      },
      {
        label: "Actions",
        screen: "example.Actions",
        icon: require("./img/swap.png"),
        title: "Navigation Actions"
      }
    ];

    if (Platform.OS === "android") {
      tabs.push({
        label: "Transitions",
        screen: "example.Transitions",
        icon: require("./img/transform.png"),
        title: "Navigation Transitions"
      });
    }

    switch (root) {
      case "login":
        Navigation.startSingleScreenApp({
          screen: {
            screen: "example.Login", // unique ID registered with Navigation.registerScreen
            title: "Welcome", // title of the screen as appears in the nav bar (optional)
            navigatorStyle: { navBarHidden: true }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
          }
        });
        return;

      case "after-login":
        // this will start our app
        Navigation.startTabBasedApp({
          tabs,
          animationType: Platform.OS === "ios" ? "slide-down" : "fade",
          tabsStyle: {
            tabBarBackgroundColor: "#003a66",
            tabBarButtonColor: "#ffffff",
            tabBarSelectedButtonColor: "#ff505c",
            tabFontFamily: "BioRhyme-Bold"
          },
          appStyle: {
            tabBarBackgroundColor: "#003a66",
            navBarButtonColor: "#ffffff",
            tabBarButtonColor: "#ffffff",
            navBarTextColor: "#ffffff",
            tabBarSelectedButtonColor: "#ff505c",
            navigationBarColor: "#003a66",
            navBarBackgroundColor: "#003a66",
            statusBarColor: "#002b4c",
            tabFontFamily: "BioRhyme-Bold"
          },
          drawer: {
            left: {
              screen: "example.Types.Drawer"
            }
          }
        });

        return;

      default:
        console.log("Not Root Found");
    }
  }
}
