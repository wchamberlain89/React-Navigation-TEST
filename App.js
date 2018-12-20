import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Linking } from "expo";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.push("Details")}
        />
        <Button
          title={"Go to link"}
          onPress={() => {
            const redirectUrl = `${Linking.makeUrl("detail")}`;
            console.log("redirect", redirectUrl);
            Linking.openURL(redirectUrl);
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title={"Go to link"}
          onPress={() => {
            const redirectUrl = `${Expo.Linking.makeUrl("home")}`;
            Linking.openURL(redirectUrl);
          }}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: "home/"
    },
    Details: {
      screen: DetailsScreen,
      path: "detail/"
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const uriPrefix = Linking.makeUrl();

export default class App extends React.Component {
  componentDidMount() {
    Linking.getInitialURL().then(url => {
      const { path, queryParams } = Linking.parse(url);
      this.setState({ url, path, queryParams });
    });
    // Linking.getInitialURL().then(initial => this.setState({ initial }));
    Linking.addEventListener("url", this._handleUrl);
  }
  _handleUrl = url => {
    this.setState({ url });
    let { path, queryParams } = Linking.parse(url);
    alert(
      `Linked to app with path: ${path} and data: ${JSON.stringify(
        queryParams
      )}`
    );
  };

  render() {
    console.log("this.state", this.state);
    return <AppContainer uriPrefix={uriPrefix} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
