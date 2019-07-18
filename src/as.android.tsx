import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { isCancel, isNotCancel } from "./helpers";
import { IActionSheet } from "./interface";
import { ISheetItem } from "./sheetItem";

interface IState {
  childrenHeight: number;
  deviceHeight: number;
}

export class ActionSheetAndroid extends Component<IActionSheet, IState> {
  public state = { deviceHeight: 0, childrenHeight: 0 };

  private positionY: Animated.Value = new Animated.Value(0);

  private opacity: Animated.Value = new Animated.Value(0);

  public componentDidMount() {
    const childrenHeight =
      React.Children.toArray(this.props.children).length * 56;

    this.setState(() => ({
      childrenHeight,
      deviceHeight: Dimensions.get("window").height
    }));

    this.positionY.setValue(childrenHeight);

    this.open();
  }

  public render() {
    const { children, title } = this.props;
    const childrenArray = React.Children.toArray(children);

    const translateY = {
      transform: [{ translateY: this.positionY }]
    };

    const cancelItem = childrenArray.find(isCancel) as React.ReactElement<
      ISheetItem
    >;

    const transformedChildren = childrenArray
      .filter(isNotCancel)
      .map((child: JSX.Element) =>
        React.cloneElement(
          child,
          child.props.onPress && {
            onPress: () => this.close(child.props.onPress)
          }
        )
      );

    return (
      <Modal transparent={true}>
        <Animated.View style={[styles.container, { opacity: this.opacity }]}>
          <TouchableWithoutFeedback
            onPress={() => cancelItem && this.close(cancelItem.props.onPress)}
          >
            <View style={styles.escape} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View style={[styles.card, translateY]}>
          {title && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          {transformedChildren}
        </Animated.View>
      </Modal>
    );
  }

  private open = () =>
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(this.positionY, {
          duration: 150,
          toValue: 0,
          useNativeDriver: true
        }),
        Animated.timing(this.opacity, {
          duration: 150,
          toValue: 0.68,
          useNativeDriver: true
        })
      ]).start();
    });

  private close = (callback: () => void) =>
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(this.positionY, {
          duration: 150,
          toValue: this.state.childrenHeight,
          useNativeDriver: true
        }),
        Animated.timing(this.opacity, {
          duration: 150,
          toValue: 0,
          useNativeDriver: true
        })
      ]).start((e: Animated.EndResult) => {
        if (e.finished) {
          callback();
        }
      });
    });
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0
  },
  container: {
    backgroundColor: "black",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  escape: { flex: 1 },
  title: {
    color: "#0000008a",
    fontSize: 16
  },
  titleContainer: {
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 16
  }
});
