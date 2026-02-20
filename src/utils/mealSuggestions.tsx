import { Meal, Child, SuggestedMeal } from "../types";

/**
 * Pure utility function to get meal suggestions for a child
 * No UI code, just business logic
 */

/**
 * Check if a meal is safe for a child (no allergens)
 * @param meal - Meal object with allergens array
 * @param childAllergens - Child's allergens array
 * @returns True if meal is safe
 */
const isMealSafe = (meal: Meal, childAllergens: string[]): boolean => {
  if (!meal.allergens || meal.allergens.length === 0) return true;
  if (!childAllergens || childAllergens.length === 0) return true;

  return !meal.allergens.some((allergen) => childAllergens.includes(allergen));
};

/**
 * Calculate preference match score for a meal
 * @param meal - Meal object with dietaryTags
 * @param dietaryPreference - Child's dietary preference
 * @returns Score (higher is better match)
 */
const calculatePreferenceScore = (
  meal: Meal,
  dietaryPreference: string,
): number => {
  if (!dietaryPreference || !meal.dietaryTags) return 0;

  // Direct match gives highest score
  if (meal.dietaryTags.includes(dietaryPreference)) {
    return 3;
  }

  // Check for compatible tags
  if (
    dietaryPreference === "vegetarian" &&
    meal.dietaryTags.includes("vegan")
  ) {
    return 2; // Vegan is compatible with vegetarian
  }

  if (
    dietaryPreference === "halal" &&
    meal.dietaryTags.includes("vegetarian")
  ) {
    return 1; // Somewhat compatible but not perfect
  }

  return 0;
};

/**
 * Get top 3 meal suggestions for a child
 * @param meals - All meals
 * @param child - Selected child object
 * @returns Top 3 suggested meals
 */
export const getMealSuggestions = (
  meals: Meal[],
  child: Child | null,
): SuggestedMeal[] => {
  if (!meals || !child) return [];

  // Filter only active meals
  const activeMeals = meals.filter((meal) => meal.isActive);

  // Step 1: Filter out meals with allergens
  const safeMeals = activeMeals.filter((meal) =>
    isMealSafe(meal, child.allergens),
  );

  // Step 2: Score and sort by dietary preference match
  const scoredMeals: SuggestedMeal[] = safeMeals.map((meal) => ({
    ...meal,
    suggestionScore: calculatePreferenceScore(meal, child.dietaryPreference),
  }));

  // Sort by score (highest first) and take top 3
  const suggestions = scoredMeals
    .sort((a, b) => b.suggestionScore - a.suggestionScore)
    .slice(0, 3);

  return suggestions;
};
