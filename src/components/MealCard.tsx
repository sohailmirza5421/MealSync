import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Meal } from "../types";
import { Colors } from "../context/Colors";

interface MealCardProps {
  meal: Meal;
  showActiveStatus?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({
  meal,
  showActiveStatus = false,
}) => {
  return (
    <View style={[styles.card, !meal.isActive && styles.inactiveCard]}>
      <View style={styles.header}>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.price}>${meal.price.toFixed(2)}</Text>
      </View>

      <View style={styles.tagsContainer}>
        <View style={styles.cuisineTag}>
          <Text style={styles.cuisineText}>{meal.cuisineTag}</Text>
        </View>

        {meal.dietaryTags.map((tag) => (
          <View key={tag} style={styles.dietaryTag}>
            <Text style={styles.dietaryText}>{tag}</Text>
          </View>
        ))}
      </View>

      {meal.allergens.length > 0 && (
        <View style={styles.allergensContainer}>
          <Text style={styles.allergensLabel}>Allergens: </Text>
          {meal.allergens.map((allergen, index) => (
            <Text key={allergen} style={styles.allergen}>
              {allergen}
              {index < meal.allergens.length - 1 ? ", " : ""}
            </Text>
          ))}
        </View>
      )}

      {showActiveStatus && (
        <View
          style={[
            styles.statusBadge,
            meal.isActive ? styles.activeBadge : styles.inactiveBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {meal.isActive ? "Active" : "Inactive"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.gray[800],
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inactiveCard: {
    opacity: 0.6,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.success[500],
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  cuisineTag: {
    backgroundColor: Colors.primary[500],
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  cuisineText: {
    color: Colors.text.inverse,
    fontSize: 12,
    fontWeight: "500",
  },
  dietaryTag: {
    backgroundColor: Colors.warning[500],
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  dietaryText: {
    color: Colors.text.inverse,
    fontSize: 12,
  },
  allergensContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  allergensLabel: {
    fontSize: 12,
    color: Colors.error[500],
    fontWeight: "500",
  },
  allergen: {
    fontSize: 12,
    color: Colors.error[500],
  },
  statusBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeBadge: {
    backgroundColor: Colors.success[500],
  },
  inactiveBadge: {
    backgroundColor: Colors.background.secondary,
  },
  statusText: {
    color: Colors.text.inverse,
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default MealCard;
