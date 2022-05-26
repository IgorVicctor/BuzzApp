import {React, useState, useEffect} from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { Container } from './style';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../../../config/firebaseconfig"
 
export default function Login({ navigation }) {

    const database = firebase.firestore()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")

    const loginFirebase = ()=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {

                let user = userCredential.user;
                let uid = user.uid;         
                    database
                        .collection("Usuarios")
                        .doc(uid)
                        .get()
                        .then((teste) => {
                        if(teste.exists){   
                            navigation.navigate("Perfil", { idUser: user.uid })
                            
                        } else {
                        database
                            .collection("Motoristas")
                            .doc(uid)
                            .get()
                            .then((doc) => {
                                if(doc.exists){
                                    navigation.navigate("PerfilMotorista", { idUser: user.uid })
                                } else {
                                    Alert.alert("Atenção", "Usuário não encontrado.")
                                }
                            });     
                        }    
                    })
                 
            })
            .catch((error) => {
                setErrorLogin(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    }
    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {     
                let uid = user.uid;      
                database
                        .collection("Usuarios")
                        .doc(uid)
                        .get()
                        .then((teste) => {
                        if(teste.exists){   
                            navigation.navigate("Perfil", { idUser: user.uid })
                            
                        } else {
                        database
                            .collection("Motoristas")
                            .doc(uid)
                            .get()
                            .then((doc) => {
                                if(doc.exists){
                                    navigation.navigate("PerfilMotorista", { idUser: user.uid })
                                } else {
                                    Alert.alert("Atenção", "Usuário não encontrado.")
                                }
                            });     
                        }    
                    }) 
            } 
          });      
    }, []);

    return (
        <View style={Container.container}>           
            <View style={Container.containerHeader}>
                <Text style={Container.message}>Bem-vindo(a)</Text>
            </View>   
                
            <View style={Container.containerForm}>
            <Text style={Container.title}>Email</Text>
                <TextInput
                    placeholder='Digite seu email'
                    style={Container.input}
                    value={email}
                    type="text"
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={Container.title}>Senha</Text>
                <TextInput
                    placeholder='Digite sua senha'
                    style={Container.input}
                    type="text"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                {errorLogin === true
                ?
                <View style={Container.contentAlert}>
                    <MaterialCommunityIcons 
                    name="alert-circle"
                    size={24}
                    color="red"
                    />
                    <Text style={Container.warningAlert}>E-mail ou senha incorreto</Text>
                </View>
                :
                <View/>
                }
                { email === "" || password === "" 
                ?
                    <TouchableOpacity
                    disabled={true}
                    style={Container.button} 
                    >
                        <Text style={Container.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                :

                    <TouchableOpacity
                    style={Container.button} 
                    onPress={loginFirebase}     
                    >
                        <Text style={Container.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={Container.buttonRegister} onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={Container.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>               
            </View>
        </View>
    );
}