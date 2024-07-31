import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screen/HomeScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import BulletinNote from "./src/screen/bulletin/BulletinNote";

import AfficheEleve from "./src/screen/elevescreen/AfficheEleve";
import AjoutElev from "./src/screen/elevescreen/AjoutElev";
import ModifierEleve from "./src/screen/elevescreen/ModifierEleve";

import AfficheEvaluation from "./src/screen/evaluation/AfficheEvaluation";
import AjoutEvaluation from "./src/screen/evaluation/AjoutEvaluation";
import ModifierEvaluation from "./src/screen/evaluation/ModifierEvaluation";


import AfficheCours from "./src/screen/cours/AfficheCours";
import AjoutCours from "./src/screen/cours/AjoutCours";
import ModifierCours from "./src/screen/cours/ModifierCours";

import AfficheNote from "./src/screen/note/AfficheNote";
import AjoutNote from "./src/screen/note/AjoutNote";





const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AfficheCours" component={AfficheCours} />
        <Stack.Screen name="BulletinNote" component={BulletinNote} />
        
        <Stack.Screen name="AfficheEleve" component={AfficheEleve} />
        <Stack.Screen name="AjoutElev" component={AjoutElev} />
        <Stack.Screen name="ModifierEleve" component={ModifierEleve} />

        <Stack.Screen name="AfficheEvaluation" component={AfficheEvaluation} />
        <Stack.Screen name="AjoutEvaluation" component={AjoutEvaluation} />
        <Stack.Screen name="ModifierEvaluation" component={ModifierEvaluation} />

        <Stack.Screen name="AjoutCours" component={AjoutCours} />
        <Stack.Screen name="ModifierCours" component={ModifierCours} />

        <Stack.Screen name="AfficheNote" component={AfficheNote} />
        <Stack.Screen name="AjoutNote" component={AjoutNote} />





        <Stack.Screen name={"HOME"} component={HomeScreen} />
        <Stack.Screen name={"LOGIN"} component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
