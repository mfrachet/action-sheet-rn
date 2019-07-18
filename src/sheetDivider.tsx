import React from "react";
import { StyleSheet, View } from "react-native";

export const SheetDivider = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#0000001e",
    height: StyleSheet.hairlineWidth
  }
});
