import React, { Component } from "react";
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  View,
  ImageBackground
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import * as appActions from "../../actions/index";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from "native-base";

export class Login extends Component {
  render() {
    return (
      <ImageBackground
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        source={require("./../../img/background.png")}
      >
        <View style={{ flex: 0.3 }} />
        <Container style={{ flex: 0.6, justifyContent: "center" }}>
          {/* <Header /> */}
          <Content>
            <Form>
              <Item floatingLabel>
                <Label style={{ color: "white" }}>Username</Label>
                <Input style={{ color: "white" }} />
              </Item>
              <Item floatingLabel last>
                <Label style={{ color: "white" }}>Password</Label>
                <Input style={{ color: "white" }} />
              </Item>
            </Form>
            <Button
              block
              style={{
                marginTop: 50,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: "#1A1A38"
              }}
              onPress={() => this.onLoginPress()}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </Button>
          </Content>
        </Container>
        <View style={{ flex: 0.2 }} />
      </ImageBackground>
    );
  }

  /*
  onLoginPress:
    Changes the root value of the app to be 'after-login', changing it to tab view
  */
  onLoginPress() {
    this.props.dispatch(appActions.login());
  }
}

export default connect()(Login);
