import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useMeals } from "../context/MealContext";
import MealCard from "../components/MealCard";
import { Colors } from "../context/Colors";

const AdminScreen: React.FC = () => {
  const { meals, toggleMealActive } = useMeals();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin - Meal Management</Text>
        <Text style={styles.subtitle}>
          Tap any meal to toggle active status
        </Text>
      </View>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleMealActive(item.id.toString())}
          >
            <MealCard meal={item} showActiveStatus={true} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
    backgroundColor: Colors.background.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default AdminScreen;
