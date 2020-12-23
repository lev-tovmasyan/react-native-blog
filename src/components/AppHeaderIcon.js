import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const AppHeaderIcon = (props) => (
  <HeaderButton  IconComponent={Ionicons} iconSize={24} color="white" {...props} />
);

export default AppHeaderIcon;
