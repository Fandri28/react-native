import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("BulletinNote");
  };

  const handleSignup = () => {
    navigation.navigate("AfficheEleve");
  };
  const handleLogin1 = () => {
    navigation.navigate("AfficheCours");
  };

  const handleSignup1 = () => {
    navigation.navigate("AfficheEvaluation");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/man.png")} style={styles.bannerImage} />
      <Text style={styles.title}>Gestion des Notes d'Élèves</Text>
      <Text style={styles.subTitle}>
        Bienvenue dans l'application de gestion des notes des élèves. Utilisez les boutons ci-dessous pour naviguer.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Bulletin Note</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>AfficheEleve</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
          ,
          ]}
          onPress={handleLogin1}
        >
          <Text style={[styles.loginButtonText1]}>AfficheCours</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, {backgroundColor:colors.primary}]}
          onPress={handleSignup1}
        >
          <Text style={styles.signupButtonText1}>AfficheEvaluation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingTop:50,
  },
  logo: {
    height: 40,
    width: 140,
    marginVertical: 30,
  },
  bannerImage: {
    marginVertical: 20,
    height: 250,
    width: 231,
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.primary,
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.secondary,
    fontFamily: fonts.Medium,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    width: "80%",
    height: 60,
    borderRadius: 100,
    backgroundColor: "white",

  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
    backgroundColor: colors.white,

  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  loginButtonText1: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,

  },
  signupButtonText1: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.white,

  },
});
