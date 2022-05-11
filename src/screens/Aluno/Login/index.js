import {React, useState, useEffect} from "react";
import { View, TextInput, TouchableOpacity, Text, Keyboard, Pressable , KeyboardAvoidingView } from "react-native";
import { Container } from './style';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Onibus from '../../../img/Onibus.svg';
import firebase from "../../../config/firebaseconfig"
 
export default function Login({ navigation }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")

    const loginFirebase = ()=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;         
                navigation.navigate("Perfil", { idUser: user.uid })  
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
              
            navigation.navigate("Perfil", { idUser: user.uid })
            var uid = user.uid; 
            
            } 
          });
          
    }, []);

    const clicouCadastro = () => {
        /*navigation.navigate("Cadastro")*/
        navigation.reset({
            index: 0,
            routes: [{ name: "Cadastro" }]
        })
    }

    const clicou = () => {
        /*navigation.navigate('Cartao')*/
        navigation.reset({
            index: 0,
            routes: [{ name: "Perfil" }]
        })
    }

    const clicouLoginMotorista = () => {
        /*navigation.navigate('Cartao')*/
        navigation.reset({
            index: 0,
            routes: [{ name: "LoginMotorista" }]
        })
    }

    return (
        <View style={Container.MainContainer}>
            <Pressable onPress={Keyboard.dismiss}>
                <View style={Container.InputArea}>

                    <Text style={Container.TextoTitulo}> Seja bem vindo! </Text>

                    <View style={Container.InputLogin}>
                        <Text style={Container.Texto}>Email</Text>
                        <TextInput style={Container.input} 
                        type="text"
                        value={email}
                        onChangeText={(text) => setEmail(text)}/>

                        <Text style={Container.Texto}> Senha</Text>
                        <TextInput style={Container.input} secureTextEntry={true} 
                         type="text"
                         value={password}
                        onChangeText={(text) => setPassword(text)}/>
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
                            style={Container.botao} 
                            >
                                <Text style={Container.botaoText}>Entrar</Text>
                            </TouchableOpacity>
                        :

                            <TouchableOpacity
                            style={Container.botao} 
                            onPress={loginFirebase}     
                            >
                                <Text style={Container.botaoText}>Entrar</Text>
                            </TouchableOpacity>
                        }

                        

                        <TouchableOpacity style={Container.textoCadastro} onPress={() => clicouCadastro()}>
                            <Text style={{ color: "#6558f5" }}>Ainda não possui uma conta?</Text>
                            <Text style={{ fontWeight: "bold", color: "#6558f5" }}> Cadastre-se</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[Container.textoCadastro, {bottom: 10}]} onPress={() => clicouLoginMotorista()}>
                            <Text style={{ color: "#6558f5" }}>Fazer login como<Text style={{fontWeight: 'bold'}}> Motorista</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={Container.LogoBuzz}>
                    <Onibus width="15%" height="45" />
                    <Text style={Container.TextoLogo}>BUZZ</Text>
                </View>

            </Pressable>
        </View>
    );
}