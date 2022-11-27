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

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor ingrese un correo valido")
    .required("El correo el requerido"),
  password: yup
    .string()
    .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
    .required("La contraseña es requerida"),
});

function LoginScreenUser({ navigation }) {

  const LoginUser = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === "auth/invalid-password") {
          Alert.alert("Error", "Contraseña invalida!")
        }
        if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "El correo es invalido!")
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
          Acceder</Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => LoginUser(values)}
          >
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
            <AppSubmitButton title="Entrar" />
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

        <Text style={styles.join}>
          {" "}
          <Text
            onPress={() => navigation.navigate("Recovery")}
            style={{ color: colors.white }}
          >
            Olvide mi contraseña
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

export default LoginScreenUser;
