import React from "react";
import { ActionSheetIOS } from "react-native";
import { isCancel, isPressable, isRemove } from "./helpers";
import { IActionSheet } from "./interface";
import { ISheetItem } from "./sheetItem";

export class ActionSheetIos extends React.Component<IActionSheet> {
  public componentDidMount() {
    const { children, message, title, color } = this.props;

    const childrenArray = React.Children.toArray(children).filter(isPressable);

    const texts = childrenArray.map(
      (child: JSX.Element) => child.props.children
    );

    const cancelIndex = childrenArray.findIndex(isCancel);
    const removeIndex = childrenArray.findIndex(isRemove);

    ActionSheetIOS.showActionSheetWithOptions(
      {
        cancelButtonIndex: cancelIndex,
        destructiveButtonIndex: removeIndex,
        message,
        options: texts,
        tintColor: color,
        title
      },
      buttonIndex => {
        const child = childrenArray[buttonIndex] as React.ReactElement<
          ISheetItem
        >;

        return child && child.props.onPress && child.props.onPress();
      }
    );
  }

  public render(): null {
    return null;
  }
}
