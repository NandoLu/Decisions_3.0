// app/App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./Menu";
import Index from "./index";  // Caso queira manter a navegação para Index

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Index" component={Index} />  // Navegação para index.ts
      </Stack.Navigator>
    </NavigationContainer>
  );
}
