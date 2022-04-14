import {React, useState} from "react";
import { Container } from './style';
import { View, TextInput, TouchableOpacity, Text, Keyboard, Pressable, Alert, ScrollView, KeyboardAvoidingView } from "react-native";
import { CheckBox } from "react-native-elements";
import firebase from "../../../config/firebaseconfig"
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Cadastro({navigation}) {

    const database = firebase.firestore()
    
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [cpass, setCpass] = useState(null)
    const[errorRegister, setErrorRegister] = useState("")
    const[nome, setNome] = useState("");
    const[cidade, setCidade] = useState("");
    const[faculdade, setFaculdade] = useState("");
    const[curso, setCurso] = useState("");
    const[periodo, setPeriodo] = useState("");

    const [segunda, setSegunda] = useState(false);
    const [terca, setTerca] = useState(false);
    const [quarta, setQuarta] = useState(false);
    const [quinta, setQuinta] = useState(false);
    const [sexta, setSexta] = useState(false);

    const [errorEmail, setErrorEmail] = useState(null)
    const [errorNome, setErrorNome] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorCPassword, setErrorCPassword] = useState(null)
    const [errorFaculdade, setErrorFaculdade] = useState(null)
    const [errorCurso, setErrorCurso] = useState(null)
    const [errorPeriodo, setErrorPeriodo] = useState(null)
    const [isLoading, setLoading] = useState(false)

   
    const validar = () => {
        let error = false
        setErrorPeriodo(null)
        setErrorFaculdade(null)
        setErrorCurso(null)
        setErrorNome(null)
        setErrorEmail(null)
        setErrorPassword(null)
        setErrorCPassword(null)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(email).toLowerCase())) {
            setErrorEmail("Preencha o email corretamente")
            error = true
        }

       
        if (password == null && password != cpass) {
            setErrorPassword("Preencha com uma senha válida")
            error = true
        }

        if (password != cpass) {
            setErrorCPassword("As senhas nao coincidem, tente novamente")
            error = true
        }

        return !error
    }
 
    const registerUser = () =>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                database.collection(user.uid).add({
                    nome: nome,
                    email: email,
                    cidade: cidade,
                    faculdade: faculdade,
                    curso: curso,
                    periodo: periodo
                  })
                
                navigation.navigate("Perfil", { idUser: user.uid })
            })
            .catch((error) => {
                setErrorRegister(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    }


    const clicouLogin = () => {
        navigation.navigate("Login")
    }


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
                    <TextInput style={Container.input} type="text" value={email} onChangeText={value => {
                                        setErrorNome(null)
                                        setEmail(value)

                                    }}
                                    errorMessage={errorEmail}
                                    />

                    <Text style={Container.Texto}>Senha</Text>
                    <TextInput style={Container.input} secureTextEntry={true} type="text" value={password} onChangeText={value => {
                                        setErrorPassword(null)
                                        setPassword(value)
                                    }}
                                    errorMessage={errorPassword}  />

                    <Text style={Container.Texto}>Confirmar senha</Text>
                    <TextInput style={Container.input}  secureTextEntry={true} 
                                    onChangeText={value => {

                                        setErrorCPassword(null)
                                        setCpass(value)
                                    }}
                                    errorMessage={errorCPassword}/>

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
                              onPress={() => { registerUser() }}
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
        </ScrollView>
    </View>
    );
}