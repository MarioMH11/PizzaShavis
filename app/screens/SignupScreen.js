import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { auth } from "../configs/firebase";
import tailwind from 'tailwind-react-native-classnames';

const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, ({ min }) => `El nombre debe tener al menos ${min} caracteres`)
    .max(50, ({ max }) => `El nombre debe tener menos de ${max} caracteres`)
    .required("Se requiere el nombre"),
  email: yup
    .string()
    .email("Por favor ingrese un correo valido")
    .required("El correo es necesario"),
  password: yup
    .string()
    .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
    .required("La contraseña es requerida"),
});

function SignupScreen({ navigation }) {

  const signUpUser = ({ name, email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: name })
          .then(() => {

          })
          .catch((err) => {
            Alert.alert("Error", err.message)
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Error", "¡Esa dirección de correo electrónico ya está en uso!")
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "¡Esa dirección de correo electrónico no es válida!")
        }

        Alert.alert('ERROR: ', error.message);
      });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={tailwind`py-4 rounded-2xl`}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.wellcomeTo}>
          Crear cuenta
        </Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => signUpUser(values)}
          >
            <AppFormFeilds
              name="name"
              placeholder="Nombre de usuario"
            />
            <AppFormFeilds
              name="email"
              placeholder="Correo electronico"
              keyboardType="email-address"
            />
            <AppFormFeilds
              name="password"
              placeholder="Contraseña"
              autoCompleteType="off"
              password={true}
            />
            <AppSubmitButton title="Registrarse" />
          </AppForm>
        </View>

        <Text style={styles.join}>
          ¿Ya estas registrado?{" "}
          <Text
            onPress={() => navigation.navigate("UserLogin")}
            style={{ color: colors.white }}
          >
            Iniciar sesión
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
    color: colors.white,
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

export default SignupScreen;
