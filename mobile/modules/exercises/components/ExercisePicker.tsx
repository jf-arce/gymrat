import React from "react";
import { Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Exercise } from "@/modules/exercises/types/types";
import { StyleSheet } from "react-native";
import { API_URL } from "@/constants/api";

export default function ExercisePicker() {
  const [exercises, setExercises] = useState<Exercise[]>();
  const [selectedExercise, setSelectedExercise] = useState<string>();

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch(`${API_URL}/exercises`);
      const data = await response.json();
      setExercises(data);
    };
    fetchExercises();
  }, []);
  return (
    <View>
      <Text>Gym Rat</Text>
      <Pressable
        onPress={() => alert("Pressed")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          },
          {
            padding: 10,
            borderRadius: 5,
          },
        ]}
      >
        <Text>Press Me</Text>
      </Pressable>

      <Text>Ejercicios</Text>
      <Picker
        selectedValue={selectedExercise}
        onValueChange={(itemValue) => setSelectedExercise(itemValue)}
        style={styles.picker}
      >
        {exercises?.map((exercise) => (
          <Picker.Item
            key={exercise.id}
            label={exercise.name}
            value={exercise.id}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 60,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
