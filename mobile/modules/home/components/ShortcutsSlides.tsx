import { PlusIcon, StadisticsIcon } from "@/modules/core/components/Icons";
import { TextFont } from "@/modules/core/components/TextFont";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const data = [
  {
    id: "1",
    title: "Crear rutina",
    icon: "crearRutina",
    color: "#1f1f1f",
    className: "border-[#cfdeff]",
    text: "text-[#cfdeff]",
  },
  {
    id: "2",
    title: "Mi Progreso",
    icon: "miProgreso",
    color: "#d6bef7",
    className: "border-[#d6bef7]",
    text: "text-[#d6bef7]",
  },
  {
    id: "3",
    title: "Profile",
    icon: "person", // Aquí el ícono es solo un texto
    color: "#1f1f1f",
    className: "border-[#fee6d4]",
    text: "text-[#fee6d4]",
  },
  {
    id: "4",
    title: "Settings",
    icon: "settings", // Aquí el ícono es solo un texto
    color: "#1f1f1f",
    className: "border-[#d9fff0]",
    text: "text-[#d9fff0]",
  },
];

export const ShortcutsSlides = () => {
  return (
    <View className="mt-10">
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex items-center justify-center p-4 rounded-xl mr-4 border-2 bg-neutral-950 ${item.className}`}
            style={{ height: 90, width: 150 }}
          >
            {item.icon === "crearRutina" && <PlusIcon color="#cfdeff" />}
            {item.icon === "miProgreso" && <StadisticsIcon color="#d6bef7" />}
            {item.icon === "person" && (
              <Text style={{ color: "#fff" }}>👤</Text>
            )}
            {item.icon === "settings" && (
              <Text style={{ color: "#fff" }}>⚙️</Text>
            )}
            <TextFont
              className={`${item.text} mt-2 font-semibold text-center text-md`}
            >
              {item.title}
            </TextFont>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
