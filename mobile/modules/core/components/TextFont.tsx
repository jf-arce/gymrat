import React from "react";
import { Text, TextProps } from "react-native";

type SolidenFont =
  // | "thin"
  | "regular"
  // | "medium"
  | "semibold"
  // | "bold"
  | "black";

interface TextSolidenFontProps extends TextProps {
  font?: SolidenFont;
}

export const TextFont = ({
  font = "regular",
  children,
  ...props
}: TextSolidenFontProps) => {
  const getFont = () => {
    if (font === "regular") {
      return "font-marios-regular";
    }
    if (font === "semibold") {
      return "font-marios-semibold";
    }
    if (font === "black") {
      return "font-marios-black";
    }
  };

  const fontType = getFont();

  return (
    <Text {...props} className={`${fontType} ${props.className}`}>
      {children}
    </Text>
  );
};
