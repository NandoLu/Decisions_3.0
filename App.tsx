// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./app/Menu";
import Index from "./app/index";  // Certifique-se de que o caminho está correto

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
