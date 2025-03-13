import { createContext, useContext, ReactNode, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

interface FontContextType {
  fontsLoaded: boolean;
}

const FontContext = createContext<FontContextType | null>(null);

export function FontProvider({ children }: { children: ReactNode }) {
  const [fontsLoaded, error] = useFonts({
    "marios-black": require("../../../assets/fonts/Marios/marios-black.otf"),
    "marios-regular": require("../../../assets/fonts/Marios/marios-regular.otf"),
    "marios-semibold": require("../../../assets/fonts/Marios/marios-semibold.otf"),

    "clashgrotesk-extralight": require("../../../assets/fonts/ClashGrotesk/ClashGrotesk-Extralight.otf"),
    "clashgrotesk-light": require("../../../assets/fonts/ClashGrotesk/ClashGrotesk-Light.otf"),
    "clashgrotesk-regular": require("../../../assets/fonts/ClashGrotesk/ClashGrotesk-Regular.otf"),
    "clashgrotesk-medium": require("../../../assets/fonts/ClashGrotesk/ClashGrotesk-Medium.otf"),
    "clashgrotesk-semibold": require("../../../assets/fonts/ClashGrotesk/ClashGrotesk-Semibold.otf"),
    "clashgrotesk-bold": require("../../../assets/fonts/ClashGrotesk/ClashGrotesk-Bold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFontContext() {
  return useContext(FontContext);
}
