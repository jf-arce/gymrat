import React from "react";
import { Text, TextProps } from "react-native";

type SolidenFont =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
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
    if (font === "thin") {
      return "font-clashgrotesk-extralight";
    }
    if (font === "light") {
      return "font-clashgrotesk-light";
    }
    if (font === "regular") {
      return "font-clashgrotesk-regular";
    }
    if (font === "medium") {
      return "font-clashgrotesk-medium";
    }
    if (font === "semibold") {
      return "font-clashgrotesk-semibold";
    }
    if (font === "bold") {
      return "font-clashgrotesk-bold";
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
