import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../styles/theme";

const AppButton = ({
	onPress,
  title,
  style = {},
  textStyle = {},
  textColor = "white",
  ...props
}) => {
  return (
    <TouchableOpacity
			onPress={onPress}
      activeOpacity={0.5}
      style={{ ...styles.button, ...style }}
      {...props}
    >
      <Text style={{ ...styles.title, ...textStyle, color: textColor }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    borderRadius: 5,
    backgroundColor: THEME.MAIN_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-regular",
  },
});
