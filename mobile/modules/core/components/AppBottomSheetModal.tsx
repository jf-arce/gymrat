import React, { forwardRef, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
export type Ref = BottomSheetModal;

export const CustomBottomSheetModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);

  return (
    <BottomSheetModal ref={ref} index={-1} snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>Bottom Modal 😎</Text>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";
