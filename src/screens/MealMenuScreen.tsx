import { Picker } from "@react-native-picker/picker";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MealCard from "../components/MealCard";
import SuggestionStrip from "../components/SuggestionStrip";
import { useChild } from "../context/ChildContext";
import { Colors } from "../context/Colors";
import { useMeals } from "../context/MealContext";

const MealMenuScreen: React.FC = () => {
  const { meals } = useMeals();
  const { children, selectedChild, setSelectedChild } = useChild();

  const activeMeals = meals.filter((meal) => meal.isActive);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Menu</Text>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Child: </Text>
          <Picker
            selectedValue={selectedChild.id.toString()}
            style={styles.picker}
            onValueChange={(itemValue) => {
              const child = children.find(
                (c) => c.id.toString() === String(itemValue),
              );
              if (child) {
                setSelectedChild(child);
              }
            }}
          >
            {children.map((child) => (
              <Picker.Item
                key={child.id.toString()}
                label={child.name}
                value={child.id.toString()}
              />
            ))}
          </Picker>
        </View>
      </View>

      <SuggestionStrip />

      <FlatList
        data={activeMeals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MealCard meal={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No active meals available</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
    backgroundColor: Colors.background.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  picker: {
    width: 120,
    height: 40,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
});

export default MealMenuScreen;
