import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { Container } from './style';

import Onibus from '../../../img/Onibus.svg';
import firebase from "../../../config/firebaseconfig.js";
import Icon from 'react-native-vector-icons/Entypo';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

import QRCode from 'react-native-qrcode-svg';

export default function Cartao({navigation}){

/*function imagePickerCallback(data){
  console.log(data)
}*/

/*const [inputText, setInputText] = useState('');*/
const [qrValue, setQrValue] = useState('');

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
    const func = async () => {
      setUrl(result.uri);
      const storage = getStorage();
      const reference = ref(storage, firebase.auth().currentUser.uid + '.png');
      await getDownloadURL(reference).then((url) => {
        setUrl(url);
      })
    }

    if (url == null) {func()};
  }, []);

return(
  <View style={Container.container}>
    <FlatList
    showsVerticalScrollIndicator={true}
    data={dados}
    keyExtractor={(item, index) => index.toString()}
    renderItem={( { item } ) =>{
    return(
      <ScrollView>
      <View style={Container.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon style={{marginTop: 45, left: 10, width: 50}} name="menu" size={45} color='#fff'/>
      </TouchableOpacity>

        <View style={Container.headerContent}>
            <Image style={Container.avatar}
              source={{ uri: url ? url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU' }}/>
            <Text style={Container.name}>{item.nome} </Text>
            <Text style={Container.userInfo}>{item.email}</Text>
            <Text style={Container.userInfo}>{item.cidade}</Text>
        </View>          
        {/*<Text style={{color: "#6558f5", textAlign: 'center', bottom: 50, fontSize: 15}}>Centro Universitário de Itajubá - FEPI </Text>*/}
      </View>

      <View style={Container.body}>
          <SafeAreaView>
              <View style={{top: 65}}>
                  <QRCode
                      value={qrValue ? qrValue : firebase.auth().currentUser.uid}
                      size={260}
                      color="black"
                      />
              </View>
          </SafeAreaView> 
      </View>  
      </ScrollView>  
    )
  }}
  />
</View>    
);
}

