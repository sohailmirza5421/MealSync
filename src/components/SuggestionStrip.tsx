import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useChild } from "../context/ChildContext";
import { Colors } from "../context/Colors";
import { useMeals } from "../context/MealContext";
import { getMealSuggestions } from "../utils/mealSuggestions";
import MealCard from "./MealCard";

const SuggestionStrip: React.FC = () => {
  const { meals } = useMeals();
  const { selectedChild } = useChild();

  const suggestions = useMemo(() => {
    return getMealSuggestions(meals, selectedChild);
  }, [meals, selectedChild]);

  if (suggestions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No safe meal suggestions for {selectedChild.name}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested for {selectedChild.name}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {suggestions.map((meal) => (
          <View key={meal.id.toString()} style={styles.suggestionCard}>
            <MealCard meal={meal} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray[50],
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  suggestionCard: {
    width: 280,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.background.secondary,
  },
  emptyText: {
    fontSize: 14,
    color: "#7f8c8d",
    fontStyle: "italic",
  },
});

export default SuggestionStrip;
