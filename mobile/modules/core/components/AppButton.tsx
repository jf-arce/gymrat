import { Pressable } from "react-native";
import { TextFont } from "./TextFont";

interface AppButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  accessibilityLabel?: string;
  buttonClassname?: string;
  textClassname?: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  onPress?: () => void;
}

export const AppButton = ({
  children,
  disabled,
  accessibilityLabel = "A Button",
  buttonClassname,
  textClassname,
  variant = "primary",
  icon,
  onPress,
}: AppButtonProps) => {
  const primaryStyles = `bg-primary active:opacity-50`;
  const secondaryStyles = `bg-secondary`;
  return (
    <Pressable
      className={`
        flex-row justify-center items-center gap-2 transition-colors duration-75 py-3 px-3 rounded-xl disabled:bg-gray-500 opacity-100
        ${variant === "primary" && primaryStyles}
        ${variant === "secondary" && secondaryStyles} 
        ${buttonClassname}
      `}
      disabled={disabled}
      onPress={onPress}
      accessible
      accessibilityLabel={accessibilityLabel}
    >
      {icon || null}
      <TextFont
        font="medium"
        className={`
          !text-secondary
          text-md
          ${variant === "primary" && "text-secondary"}
          ${variant === "secondary" && "text-primary"}
          ${textClassname}
        `}
      >
        {children}
      </TextFont>
    </Pressable>
  );
};
