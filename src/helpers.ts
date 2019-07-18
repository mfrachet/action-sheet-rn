export const isRemove = (el: JSX.Element) => el.props.type === "remove";
export const isCancel = (el: JSX.Element) => el.props.type === "cancel";
export const isNotCancel = (el: JSX.Element) => el.props.type !== "cancel";
export const isPressable = (el: JSX.Element) => el.props.onPress;
