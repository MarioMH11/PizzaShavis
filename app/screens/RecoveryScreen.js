import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { auth } from "../configs/firebase";
import tailwind from 'tailwind-react-native-classnames';

const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor ingrese un correo valido")
});



function RecoveryPassUser({ navigation }) {

  const recovery = ({ email}) => {
    auth
      .sendPasswordResetEmail(email) 
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
        }
        Alert.alert('Ha ocurrido un error: ', "El correo `" + email +"´ no se encuentra en los registros de nuestro sistema\nRevisa nuevamente y vuelve a intentarlo");
        
      });
        Alert.alert("Se ha enviado un correo con los pasos a seguir para cambiar la contraseña")



  };




  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={tailwind`py-4 rounded-2xl`}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.wellcomeTo}>
          Recuperar contraseña</Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ email: ""}}
            validationSchema={emailValidationSchema}
            onSubmit={(values) => recovery(values)}
          >
            <AppFormFeilds
              name="email"
              placeholder="Correo electronico"
              keyboardType="email-address"
            />

            <AppSubmitButton 
            title="Enviar correo de recuperación" />
          </AppForm>
        </View>

        <Text style={styles.join}>
          ¿Aun no estar registrado?{" "}
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{ color: colors.white }}
          >
            Registrarse
          </Text>
        </Text>


      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    justifyContent: 'center'
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  logo: {
    height: 160,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  wellcomeTo: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.white,
    marginTop: 20,
    textAlign: "center",
  },
  brand: {
    fontSize: 23,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "500",
  },
  form: {
    marginTop: 10,
  },
  join: {
    marginTop: 16,
    textAlign: "center",
    color: colors.white,
  },
  or: {
    color: colors.gray,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default RecoveryPassUser;