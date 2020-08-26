import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";

export default class RegisterScreen extends Component {
  // header削除
  static navigationOptions = {
    headerShown: false,
  };
  // initial state
  state = {
    user: {
      name: "",
      email: "",
      password: "",
      avatar: undefined,
    },
    errorMessage: null,
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  handleSignUp = () => {
    console.log("RegisterScreen - handleSignup: " + this.state.user);
    Fire.shared.createUser(this.state.user);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <Image source={require("../assets/hz2.png")}></Image>

        {/* 戻るボタン */}

        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={32}
            color="#FFF"
          ></Ionicons>
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            top: 64,
            alignItems: "center",
            width: "100%",
          }}
        ></View>

        {/* ----------- アバター登録 ----------- */}
        <View
          style={{
            position: "absolute",
            top: 115,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.greeting}>{"無料新規登録"}</Text>
          {/* 写真を選択する */}
          <TouchableOpacity
            style={styles.avatar}
            onPress={this.handlePickAvatar}
          >
            <Image source={{ uri: this.state.avatar }} style={styles.avatar} />
            <Ionicons
              name="ios-add"
              size={40}
              color="#FFF"
              style={{ marginTop: 10, marginLeft: 0 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>

        {/* ----------- エラー表示 ----------- */}
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        {/* ----------- 入力フォーム ----------- */}
        <View style={styles.form}>
          {/* 名前入力 */}
          <View>
            <Text style={styles.inputTitle}>名前</Text>
            <TextInput
              style={styles.input}
              outoCapitalize="none"
              onChangeText={(name) =>
                this.setState({ user: { ...this.state.user, name } })
              }
              value={this.state.name}
            ></TextInput>
          </View>

          {/* メールアドレス入力 */}
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>メールアドレス</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) =>
                this.setState({ user: { ...this.state.user, email } })
              }
              value={this.state.user.email}
            ></TextInput>
          </View>

          {/* パスワード入力 */}
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>パスワード</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) =>
                this.setState({ user: { ...this.state.user, password } })
              }
              value={this.state.user.password}
            ></TextInput>
          </View>
        </View>

        {/* ----------- 新規登録ボタン ----------- */}
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>新規登録</Text>
        </TouchableOpacity>

        {/* ----------- ログインボタン ----------- */}
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 25 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text
            style={{
              color: "#414959",
              fontSize: 13,
              fontWeight: "500",
              color: "#E9446A",
            }}
          >
            ログイン
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// ----------- スタイル -----------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  greeting: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "#D9AD26",
  },

  errorMessage: {
    height: 22,
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
    marginTop: -50,
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
    backgroundColor: "#056366",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#D9AD26",
    borderRadius: 60,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  back: {
    position: "absolute",
    top: 58,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E2E6",
  },
});
