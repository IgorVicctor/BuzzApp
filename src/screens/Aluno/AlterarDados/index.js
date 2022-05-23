import {React, useState, useEffect} from "react";
import { Container } from './style';
import { View, TextInput, TouchableOpacity, Text, Keyboard, Pressable, Alert, ScrollView, KeyboardAvoidingView, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import firebase from "../../../config/firebaseconfig"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  

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
    const[diasdeuso, setDiasDeUso] = useState("");


    const [errorEmail, setErrorEmail] = useState(null)
    const [errorNome, setErrorNome] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorCPassword, setErrorCPassword] = useState(null)
    const [errorFaculdade, setErrorFaculdade] = useState(null)
    const [errorCurso, setErrorCurso] = useState(null)
    const [errorPeriodo, setErrorPeriodo] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const [url, setUrl] = useState(null);
   
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

     

        if (password < 6) {
            Alert.alert("Atenção", "Preencha com uma senha válida")
            return false;
        } 
        
        if (password != cpass) {
            Alert.alert("Atenção", "As senhas nao coincidem, tente novamente")
            return false;
        }

        return true;
    }

 
    const updateUser = () =>{
        if(validar()){

        
        const user = firebase.auth().currentUser;
        
        user.updatePassword(password).then(() => {
        // Update successful.
        }).catch((error) => {
        // An error ocurred
        // ...
        });

        database.collection("Usuarios").doc(firebase.auth().currentUser.uid).update({
            nome: nome,
            senha: password,
            cidade: cidade,
            faculdade: faculdade,
            curso: curso,
            periodo: periodo,
            diasdeuso: diasdeuso
        })
                
        Alert.alert('Atenção', 'O perfil foi atualizado com sucesso!', 
        [{text: "OK", onPress: (() => navigation.navigate("Perfil ")), style: 'cancel'}])

        /*.catch((error) => {
            setErrorRegister(true)
            let errorCode = error.code;
            let errorMessage = error.message;
        });*/
        }   
    } 

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
      
      useEffect(() => {
        const func = async () => {
          const storage = getStorage();
          const reference = ref(storage, firebase.auth().currentUser.uid + '.png');
          await getDownloadURL(reference).then((x) => {
            setUrl(x);
          })
        }
        if (url == null) {func()};
      }, []);
      
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.cancelled) {
          const storage = getStorage(); 
          const reference = ref(storage, firebase.auth().currentUser.uid + '.png'); 
          setUrl(result.uri)
          
          const img = await fetch(result.uri);
          const bytes = await img.blob();
      
          await uploadBytes(reference, bytes); 
      
          getDownloadURL(reference).then((x) => {
            database.collection("Usuarios").doc(firebase.auth().currentUser.uid).update({
              image: x
            });
          })
          
        }
      };

    return (
        <View style={Container.MainContainer}>
            <ScrollView>

            <TouchableOpacity style={{marginTop: 50, marginLeft: 10}} onPress={() => navigation.openDrawer()}>
                <Icon  name="menu" size={45} color='#6558f5' />    
            </TouchableOpacity>

            <Pressable onPress={Keyboard.dismiss}>
            <View style={Container.InputArea}>

            <Image style={Container.avatar} source={{ uri: url ? url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU' }}/>
            <TouchableOpacity onPress={pickImage}>
                <Text style={{fontSize: 12,paddingHorizontal: 3, borderWidth: 1, borderRadius: 5, textAlign:"center"}}>Atualizar foto</Text>
            </TouchableOpacity>  

                <View style={Container.InputLogin}>

                    <Text style={Container.Texto}>Nome</Text>
                    <TextInput style={Container.input} value={nome} onChangeText={(text) => setNome(text)}/>
                    
                    <Text style={Container.Texto}>Senha</Text>
                    <TextInput style={[Container.input, {padding: 6}]} secureTextEntry={true} type="text" value={password} placeholder={"Mínimo 6 caracteres"} onChangeText={value => {
                                        setErrorPassword(null)
                                        setPassword(value)
                                    }}
                                    errorMessage={errorPassword}  />

                    <Text style={Container.Texto}>Confirmar senha</Text>
                    <TextInput style={[Container.input, {padding: 6}]} placeholder={"Mínimo 6 caracteres"} secureTextEntry={true} 
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

                    <Text style={Container.Texto}>Dias de Uso:</Text>
                    <TextInput style={[Container.input, {marginBottom: 5, padding: 6}]} value={diasdeuso} placeholder={"Ex.: Seg/Qua/Sex"} onChangeText={(text) => setDiasDeUso(text)}/>

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
                        { password === "" || nome === "" || cidade === "" || faculdade === "" || curso === "" || periodo === ""
                        ?
                            <TouchableOpacity
                            disabled={true}
                            style={Container.botao} 
                            >
                                <Text style={Container.botaoText}>Alterar</Text>
                            </TouchableOpacity>
                        :

                            <TouchableOpacity
                             style={Container.botao}
                              onPress={() => { validar(), updateUser()}}
                              >
                                <Text style={Container.botaoText}>Alterar</Text>
                            </TouchableOpacity>
                        }
                </View>           
            </View>
            </Pressable>
        </ScrollView>
    </View>
    );
}