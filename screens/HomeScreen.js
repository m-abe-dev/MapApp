import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

// firebaseを接続するまでの一時的なデータ
posts = [
  {
    id: "1",
    name: "joe kdkfj",
    text: "lorem ipsumfsdafasdfasdasdfsadfas",
    timestamp: 1569109273726,
    avatar: require("../assets/woman2.jpg"),
    image: require("../assets/flower1.jpeg"),
  },
  {
    id: "2",
    name: "kanye west",
    text: "fjaohjeifoepawhgfoapesijfoashjfopasiehfg",
    timestamp: 1569109273726,
    avatar: require("../assets/woman3.jpg"),
    image: require("../assets/flower2.jpg"),
  },
  {
    id: "",
    name: "avater pico",
    text: "fjaohje12312312foashjfopasiehfg",
    timestamp: 1569109273726,
    avatar: require("../assets/woman4.jpg"),
    image: require("../assets/flower3.jpg"),
  },
];

export default class HomeScreen extends Component {
  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        {/* 投稿ヘッダー */}
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
          </View>

          {/* 投稿内容 */}

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />

          {/* お気に入りボタンとチャットボタン */}

          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <MaterialCommunityIcons name="reply" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>feed</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
