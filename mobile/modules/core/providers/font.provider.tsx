import { createContext, useContext, ReactNode, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

interface FontContextType {
  fontsLoaded: boolean;
}

const FontContext = createContext<FontContextType | null>(null);

export function FontProvider({ children }: { children: ReactNode }) {
  const [fontsLoaded, error] = useFonts({
    // "Soliden-Condensed": require("../../../assets/fonts/Soliden/SolidenTrial-Regular.ttf"),
    // "Soliden-Condensed-Bold": require("../../../assets/fonts/Soliden/SolidenTrial-BoldCondensed.ttf"),
    // "Soliden-Regular": require("../../../assets/fonts/Soliden/SolidenTrial-Regular.ttf"),
    // "Soliden-Bold": require("../../../assets/fonts/Soliden/SolidenTrial-Bold.ttf"),
    // "Soliden-Expanded": require("../../../assets/fonts/Soliden/SolidenTrial-Expanded.ttf"),
    // "Soliden-Expanded-Bold": require("../../../assets/fonts/Soliden/SolidenTrial-BoldExpanded.ttf"),
    "marios-black": require("../../../assets/fonts/Marios/marios-black.otf"),
    "marios-regular": require("../../../assets/fonts/Marios/marios-regular.otf"),
    "marios-semibold": require("../../../assets/fonts/Marios/marios-semibold.otf"),
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
