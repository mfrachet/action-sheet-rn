import React from "react";
import { Platform } from "react-native";
import { ActionSheetAndroid } from "./as.android";
import { ActionSheetIos } from "./as.ios";
import { IActionSheet } from "./interface";

export const ActionSheet: React.FC<IActionSheet> = props =>
  Platform.OS === "ios" ? (
    <ActionSheetIos {...props} />
  ) : (
    <ActionSheetAndroid {...props} />
  );

export { SheetItem } from "./sheetItem";
export { SheetDivider } from "./sheetDivider";
