import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  LayoutAnimation,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends Component {
  // header削除
  static navigationOptions = {
    headerShown: false,
  };
  // initial state
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  //　ログイン処理

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <Image source={require("../assets/hz1.png")}></Image>

        <Text style={styles.greeting}>ログイン</Text>

        {/* エラー表示 */}
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          {/* メールアドレス入力 */}
          <View>
            <Text style={styles.inputTitle}>メールアドレス</Text>
            <TextInput
              style={styles.input}
              outoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>

          {/* パスワード入力 */}
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>パスワード</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              outoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        {/* ログイン */}

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>ログイン</Text>
        </TouchableOpacity>

        {/* 新規登録 */}

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text
            style={{
              color: "#414959",
              fontSize: 13,
              fontWeight: "500",
              color: "#E9446A",
            }}
          >
            無料新規登録
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  greeting: {
    marginTop: -10,
    marginBottom: -40,
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
  },

  errorMessage: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },

  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },

  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },

  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },

  button: {
    marginHorizontal: 30,
    backgroundColor: "#056367",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
