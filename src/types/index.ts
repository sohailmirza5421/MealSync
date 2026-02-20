export interface Meal {
  id: string;
  name: string;
  price: number;
  cuisineTag: string;
  allergens: string[];
  dietaryTags: string[];
  isActive: boolean;
}

export interface Child {
  id: string;
  name: string;
  allergens: string[];
  dietaryPreference: string;
}

export interface SuggestedMeal extends Meal {
  suggestionScore: number;
}

export type RootStackParamList = {
  Menu: undefined;
  Admin: undefined;
};
