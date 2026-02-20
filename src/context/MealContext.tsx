import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Meal } from "../types";
import mealsData from "../mock-data/meals.json";

// Define the meals data with proper typing
const typedMealsData: Meal[] = mealsData as Meal[];

// State type
interface MealState {
  meals: Meal[];
  loading: boolean;
  error: string | null;
}

// Action types
type MealAction =
  | { type: "TOGGLE_MEAL_ACTIVE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

// Context type
interface MealContextType {
  meals: Meal[];
  toggleMealActive: (mealId: string) => void;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MealState = {
  meals: typedMealsData,
  loading: false,
  error: null,
};

// Reducer
const mealReducer = (state: MealState, action: MealAction): MealState => {
  switch (action.type) {
    case "TOGGLE_MEAL_ACTIVE":
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal.id === String(action.payload)
            ? { ...meal, isActive: !meal.isActive }
            : meal,
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const MealContext = createContext<MealContextType | undefined>(undefined);

// Provider props
interface MealProviderProps {
  children: ReactNode;
}

// Provider component
export const MealProvider = ({ children }: MealProviderProps) => {
  const [state, dispatch] = useReducer(mealReducer, initialState);

  const toggleMealActive = (mealId: string | number) => {
    dispatch({ type: "TOGGLE_MEAL_ACTIVE", payload: String(mealId) });
  };

  return (
    <MealContext.Provider
      value={{
        meals: state.meals,
        toggleMealActive,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

// Custom hook to use the context
export const useMeals = (): MealContextType => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMeals must be used within a MealProvider");
  }
  return context;
};
