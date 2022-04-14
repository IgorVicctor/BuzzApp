import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { Container } from './style';

import Onibus from '../../../img/Onibus.svg';
import firebase from "../../../config/firebaseconfig.js";
import Icon from 'react-native-vector-icons/Entypo';

import QRCode from 'react-native-qrcode-svg';

export default function Cartao({navigation}){

/*function imagePickerCallback(data){
  console.log(data)
}*/

/*const [inputText, setInputText] = useState('');*/
const [qrValue, setQrValue] = useState('');

const [dados, setDados] = useState([]);
const database = firebase.firestore();

useEffect(() => {
  database.collection(firebase.auth().currentUser.uid).onSnapshot((query) => {
    const list = [];
    query.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
    }); 
    setDados(list);
  });
}, [])

return(
  <View style={Container.container}>
    <FlatList
    showsVerticalScrollIndicator={true}
    data={dados}
    renderItem={( { item } ) =>{
    return(
      <ScrollView>
      <View style={Container.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon style={{marginTop: 45, left: 10, width: 50}} name="menu" size={45} color='#fff'/>
      </TouchableOpacity>

        <View style={Container.headerContent}>
            <Image style={Container.avatar}
              source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
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

