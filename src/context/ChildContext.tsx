import React, { createContext, useState, useContext, ReactNode } from "react";
import { Child } from "../types";
import childrenData from "../mock-data/children.json";

// Type the children data
const typedChildrenData: Child[] = childrenData as Child[];

// Context type
interface ChildContextType {
  children: Child[];
  selectedChild: Child;
  setSelectedChild: (child: Child) => void;
}

// Provider props
interface ChildProviderProps {
  children: ReactNode;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children }: ChildProviderProps) => {
  const [selectedChild, setSelectedChild] = useState<Child>(
    typedChildrenData[0],
  );

  return (
    <ChildContext.Provider
      value={{
        children: typedChildrenData,
        selectedChild,
        setSelectedChild,
      }}
    >
      {children}
    </ChildContext.Provider>
  );
};

export const useChild = (): ChildContextType => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error("useChild must be used within a ChildProvider");
  }
  return context;
};
