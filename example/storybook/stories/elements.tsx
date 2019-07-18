import React from "react";
import { Alert, Button, Image, View, ViewProps } from "react-native";
import { ActionSheet, SheetDivider, SheetItem } from "../../actionsheet";

interface IState {
  isVisible: boolean;
}

interface IProps extends ViewProps {
  children: (isVisible: boolean, showHide: () => void) => JSX.Element;
}

class StateHandler extends React.Component<IProps, IState> {
  public state = { isVisible: false };

  public render() {
    const { children } = this.props;
    const { isVisible } = this.state;

    return (
      <View>
        <Button title="Show me the sheet!" onPress={this.showHide} />
        {children(isVisible, this.showHide)}
      </View>
    );
  }

  private showHide = () => this.setState(s => ({ isVisible: !s.isVisible }));
}

export default () => (
  <StateHandler>
    {(isVisible, showHide) => {
      const handlePress = (name: string) => () => {
        Alert.alert(name);
        showHide();
      };

      return (
        isVisible && (
          <ActionSheet title="What do you want to do?">
            <SheetItem
              Icon={<Image source={require("./share.png")} />}
              onPress={handlePress("Share")}
            >
              Share
            </SheetItem>

            <SheetItem
              Icon={<Image source={require("./create.png")} />}
              onPress={handlePress("Create")}
            >
              Create
            </SheetItem>

            <SheetItem
              Icon={<Image source={require("./delete.png")} />}
              type="remove"
              onPress={handlePress("Remove")}
            >
              Remove
            </SheetItem>

            <SheetDivider />

            <SheetItem
              Icon={<Image source={require("./map.png")} />}
              onPress={handlePress("Locate")}
            >
              Locate
            </SheetItem>

            <SheetItem type="cancel" onPress={handlePress("Cancel")}>
              Cancel
            </SheetItem>
          </ActionSheet>
        )
      );
    }}
  </StateHandler>
);
