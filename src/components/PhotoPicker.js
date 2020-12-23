import React from "react";
import { View, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "./AppButton";
import { useState } from "react";

const PhotoPicker = ({onPick}) => {

  const [image, setImage] = useState(null);

  let takePhoto = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);
    onPick(pickerResult.uri)
  };


  return (
    <View style={styles.root}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <AppButton style={{width: '100%'}} title="Take Photo" onPress={takePhoto} />
    </View>
  );
};

export default PhotoPicker;

const styles = StyleSheet.create({
  root: {
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 15,
  },
});
