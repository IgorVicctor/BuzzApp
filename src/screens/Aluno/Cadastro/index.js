import {React, useState} from "react";

import { Container } from './style';
import { View, TextInput, TouchableOpacity, Text,  Keyboard, Pressable, Alert, ScrollView, Label, Input,  KeyboardAvoidingView, } from "react-native";
import Onibus from '../../../img/Onibus.svg';
import { CheckBox } from "react-native-elements";

import firebase from "../../../config/firebaseconfig"


import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Cadastro({navigation}) {

    const database = firebase.firestore()
    
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [errorRegister, setErrorRegister] = useState("")

    const registerUser = () =>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                navigation.navigate("Perfil", { idUser: user.uid })
            })
            .catch((error) => {
                setErrorRegister(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    }

    const[nome, setNome] = useState("");
    const[cidade, setCidade] = useState("");
    const[faculdade, setFaculdade] = useState("");
    const[curso, setCurso] = useState("");
    const[periodo, setPeriodo] = useState("");
 
    function addDados(){
      database.collection('Perfil').add({
        nome: nome,
        email: email,
        cidade: cidade,
        faculdade: faculdade,
        curso: curso,
        periodo: periodo
      })
    }

    const clicouLogin = () => {
        navigation.navigate("Login")
    }

    const [segunda, setSegunda] = useState(false);
    const [terca, setTerca] = useState(false);
    const [quarta, setQuarta] = useState(false);
    const [quinta, setQuinta] = useState(false);
    const [sexta, setSexta] = useState(false);

    const clicou = () =>{
        if(segunda === true){
            hobbies.push('segunda')
        }
        if(terca === true){
            hobbies.push('terca')
        }
        if(quarta === true){
            hobbies.push('quarta')
        }
        if(quinta === true){
            hobbies.push('quinta')
        }
        if(sexta === true){
            hobbies.push('sexta')
        }

        Alert.alert("Cadastro", "Foi realizado com sucesso!");
    }

    return (
        <View style={Container.MainContainer}>
            <ScrollView>
            <Pressable onPress={Keyboard.dismiss}>
            <View style={Container.InputArea}>              
                <View style={Container.InputLogin}>

                    <Text style={Container.Texto}>Nome</Text>
                    <TextInput style={Container.input} value={nome} onChangeText={(text) => setNome(text)}/>

                    <Text style={Container.Texto}>Email</Text>
                    <TextInput style={Container.input} type="text" value={email} onChangeText={(text) => setEmail(text)}/>

                    <Text style={Container.Texto}>Senha</Text>
                    <TextInput style={Container.input} secureTextEntry={true} type="text" value={password} onChangeText={(text) => setPassword(text)}/>

                    <Text style={Container.Texto}>Confirmar senha</Text>
                    <TextInput style={Container.input}  secureTextEntry={true}/>

                    <Text style={Container.Texto}>Cidade</Text>
                    <TextInput style={Container.input} value={cidade} onChangeText={(text) => setCidade(text)}/>

                    <Text style={Container.Texto}>Faculdade</Text>
                    <TextInput style={Container.input} value={faculdade} onChangeText={(text) => setFaculdade(text)}/>

                    <Text style={Container.Texto}>Curso</Text>
                    <TextInput style={Container.input} value={curso} onChangeText={(text) => setCurso(text)}/>

                    <Text style={Container.Texto}>Período</Text>
                    <TextInput style={Container.input} value={periodo} onChangeText={(text) => setPeriodo(text)}/>

                    <Text style={[Container.Texto, {marginBottom: 15}]}>Dias de Uso:</Text>
                    <View  style={[Container.check]}>
                       <ScrollView horizontal={true}>
                            <CheckBox title="Segunda-feira" checked={segunda} onPress={() => setSegunda(!segunda)} /> 
                            <CheckBox title="Terça-feira" checked={terca} onPress={() => setTerca(!terca)} /> 
                            <CheckBox title="Quarta-feira" checked={quarta} onPress={() => setQuarta(!quarta)} /> 
                            <CheckBox title="Quinta-feira" checked={quinta} onPress={() => setQuinta(!quinta)} /> 
                            <CheckBox title="Sexta-feira" checked={sexta} onPress={() => setSexta(!sexta)} /> 
                        </ScrollView>
                    </View>

                    {errorRegister === true
                        ?
                        <View style={Container.contentAlert}>
                            <MaterialCommunityIcons 
                            name="alert-circle"
                            size={24}
                            color="red"
                            />
                            <Text style={Container.warningAlert}>Os dados inseridos estão incorretos</Text>
                        </View>
                        :
                        <View/>
                        }
                        { email === "" || password === "" || nome === "" || cidade === "" || faculdade === "" || curso === "" || periodo === ""
                        ?
                            <TouchableOpacity
                            disabled={true}
                            style={Container.botao} 
                            >
                                <Text style={Container.botaoText}>Cadastrar</Text>
                            </TouchableOpacity>
                        :

                            <TouchableOpacity
                             style={Container.botao}
                              onPress={() => { registerUser(), addDados() }}
                              >
                                <Text style={Container.botaoText}>Cadastrar</Text>
                            </TouchableOpacity>

                        }

                    <TouchableOpacity style={Container.textoCadastro} onPress={() => {clicouLogin()}}>
                        <Text style={{color: "#6558f5"}}>Já possui uma conta?</Text>
                        <Text style={{fontWeight: "bold", color: "#6558f5"}}> Faça login</Text>
                    </TouchableOpacity>                
                </View>           
            </View>
            </Pressable>

            {/*<View style={Container.LogoBuzz}>
                <Onibus width="15%" height="45" />
                <Text style={Container.TextoLogo}>BUZZ</Text>
            </View>*/}

        </ScrollView>
    </View>
    );
}