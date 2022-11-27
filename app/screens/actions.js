
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


export const sendEmailResetPassword = async(email) => {
     const result = {statusResponse: true, error: null }
 
       try {
        auth
       await firebase.auth.sendPasswordResetEmail(email)        
       } catch (error) {
       result.statusResponse = false
       result.error = error
       } 
       return result
 }