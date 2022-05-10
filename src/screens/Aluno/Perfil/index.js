import React, {useState, useEffect} from 'react';
import { View,  TouchableOpacity, Text, Image, TextInput, ScrollView, FlatList} from 'react-native';
import { Container } from './style';

import Onibus from '../../../img/Onibus.svg';
import Icon from 'react-native-vector-icons/Entypo';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { log } from 'react-native-reanimated';

import firebase from "../../../config/firebaseconfig.js";

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

//import storage from '@react-native-firebase/storage';
//import firestore from '@react-native-firebase/firestore';

export default function Perfil({navigation}){

const [dados, setDados] = useState([]);
const database = firebase.firestore();
const [url, setUrl] = useState(null);


useEffect(() => {
  database
    .collection("Usuarios")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((doc) => {
      setDados([doc.data()]);
    });
}, []);


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

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    const storage = getStorage(); //the storage itself
    const variavel = ref(storage, firebase.auth().currentUser.uid + '.png'); //how the image will be addressed inside the storage
    setUrl(result.uri)
    //convert image to array of bytes
    const img = await fetch(result.uri);
    const bytes = await img.blob();

    await uploadBytes(variavel, bytes); //upload images
  }
};


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

  
    return(
        <View style={Container.container}>

          <FlatList
          showsVerticalScrollIndicator={true}   
          keyExtractor={(item, index) => index.toString()}
          data={dados}
          renderItem={( { item } ) =>{
          return(
          <ScrollView>
          <View style={Container.header}>
          
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={Container.touchMenu}>
            <Icon style={{top: 5, left: 10, width: 50,}} name="menu" size={45} color='#fff'/>
          </TouchableOpacity>

            <View style={Container.headerContent}>
                <Image style={Container.avatar}
                  source={{ uri: url ? url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU' }}/>

                  
                  <TouchableOpacity onPress={pickImage}>
                    <Text style={{fontSize: 12,paddingHorizontal: 3, borderWidth: 1, borderRadius: 5, textAlign:"center", top: 20, marginBottom: 21}}>Selecionar foto</Text>
                  </TouchableOpacity>
                
                
                  <Text style={Container.name}>{item.nome} </Text>
                  <Text style={Container.userInfo}>{item.email}</Text>
                  <Text style={Container.userInfo}>{item.cidade}</Text>

            </View>
            {/*<Text style={{color: "#6558f5", textAlign: 'center', bottom: 50, fontSize: 15}}>Centro Universitário de Itajubá - FEPI </Text>*/}
            
            </View>
            <View style={Container.info}>
           
                  <Text style={Container.Texto}>Faculdade: <Text style={Container.Input}>{item.faculdade}</Text></Text>
                  <Text style={Container.Texto}>Curso: <Text style={Container.Input}>{item.curso}</Text></Text>
                  <Text style={Container.Texto}>Período: <Text style={Container.Input}>{item.periodo}</Text></Text>
                  <Text style={Container.Texto}>Dias de uso: <Text style={Container.Input}>{item.diasdeuso}</Text></Text>

            </View>    
        </ScrollView>

          )
        }}
        />
        
        <View style={Container.LogoBuzz}>
              <Onibus width="15%" height="45" />
              <Text style={Container.TextoLogo}>BUZZ</Text>
        </View>
       
      </View>    
    );
}
