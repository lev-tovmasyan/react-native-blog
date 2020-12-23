import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useDispatch } from "react-redux";
import AppButton from "../../components/AppButton";
import PhotoPicker from "../../components/PhotoPicker";
import { addPost } from "../../redux/ducks/postDuck";
import { THEME } from "../../styles/theme";

const CreateScreen = ({ navigation }) => {
    const dispatch = useDispatch()
  const [text, setText] = useState("");
  const [image, setImage] = useState(null)

  const buttonDisabled = !text || !image

  const createPostHandler = () => {
      const post = {
          date: Date.now(),
          text,
          img: image,
          booked: false
      }
    dispatch(addPost(post))
    navigation.navigate('Main')
  };

  const onPick = (uri) => {
    setImage(uri)
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.root}>
          <Text style={styles.title}>Create New Post</Text>

          <TextInput
            style={styles.textarea}
            placeholder="new post title"
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker onPick={onPick} />
          <AppButton
            style={{ width: "100%", backgroundColor: buttonDisabled ? 'grey' : THEME.MAIN_COLOR }}
            onPress={createPostHandler}
            title="Create Post"
            disabled={buttonDisabled}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "open-regular",
    marginVertical: 10,
  },
});
