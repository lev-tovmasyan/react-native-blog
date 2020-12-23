import React, { useEffect } from "react";
import { useCallback } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import AppButton from "../../components/AppButton";
import { toggleBooked, removePost } from "../../redux/ducks/postDuck";
import { THEME } from "../../styles/theme";

const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const postId = navigation.getParam("id");
  const post = useSelector(state => state.post.allPosts.find((item) => item.id === postId))
  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))


  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post))
  }, [post])

  useEffect(() => {
    navigation.setParams({
      toggleHandler
    })
  }, [toggleHandler])

  useEffect(() => {
    navigation.setParams({
      booked
    })
  }, [booked])

  const removePostHandler = () => {
    Alert.alert(
      "Remove Post",
      "are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress() {
            navigation.goBack()
            dispatch(removePost(postId))
          },
        },
      ],
      { cancelable: false }
    );
  };

  if(!post) {
    return null
  }

  return (
    <ScrollView style={styles.root}>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View>
        <Text style={styles.postText}>{post.text}</Text>
      </View>
      <AppButton
        onPress={removePostHandler}
        style={styles.deleteButton}
        title="DELETE"
      />
    </ScrollView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
  },
  postText: {
    textAlign: "center",
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  deleteButton: {
    backgroundColor: THEME.DANGER_COLOR,
    width: "100%"
  }
});
