import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

export interface ISheetItem {
  type?: "cancel" | "remove";
  children: string;
  onPress?: () => void;
  Icon?: JSX.Element;
}

export const SheetItem: React.FC<ISheetItem> = ({
  children,
  onPress,
  Icon
}) => (
  <TouchableNativeFeedback
    onPress={onPress}
    background={TouchableNativeFeedback.Ripple("#cecece")}
  >
    <View style={styles.sheet}>
      {Icon && <View style={styles.icon}>{Icon}</View>}
      <Text style={styles.text}>{children}</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  icon: {
    marginRight: 32
  },
  sheet: {
    alignItems: "center",
    flexDirection: "row",
    height: 56,
    paddingHorizontal: 16
  },
  text: {
    color: "#000000de",
    flex: 1,
    fontSize: 16
  }
});
