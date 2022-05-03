import React, { Component, useEffect, useState } from 'react';
import {StyleSheet,Text, View,TouchableOpacity,Image, Alert,ScrollView,FlatList, } from 'react-native';
import {DrawerActions} from '@react-navigation/native';


import firebase from "../../../config/firebaseconfig.js";
import Icon from 'react-native-vector-icons/Entypo';
import { styles } from './style';


export default function ListaUsuarios({navigation, route}){

  const [dados, setDados] = useState([]);
  const database = firebase.firestore();


  
  useEffect(() => {
    database.collection("Usuarios").onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      }); 
      setDados(list);
    });
  }, [])

    return (
      <View style={styles.container}>
          
        <TouchableOpacity hitSlop={{top: -25, bottom: -10, left: -15, right: -345}} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Icon style={{marginTop: 20, left: 10, width: 50}} name="menu" size={45} color='#6558f5' />    
        </TouchableOpacity>
        
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={dados}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card} >
                <View style={styles.cardHeader}>
                  
                </View>
                <Image style={styles.userImage} source={{uri:item.image}}/>
                <View style={styles.cardFooter}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.name}>{item.nome}</Text>
                    <Text style={styles.position}>{item.email}</Text>
                    <TouchableOpacity style={styles.followButton} >
                      <Text style={styles.followButtonText}>Ver perfil</Text>  
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              
            )
          }}/>
        
      </View>
    );
  }


/*import React, { useState } from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Container } from './style';

import Onibus from '../../img/Onibus.svg';

import Icon from 'react-native-vector-icons/Entypo';


export default function ListaUsuarios({navigation}){

/*function imagePickerCallback(data){
  console.log(data)
}*/

/*const [inputText, setInputText] = useState('');

    return(
        <View style={Container.main}>    
        <ScrollView>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon style={{marginTop: 45, left: 10, width: 50}} name="menu" size={45} color='#fff'/>
        </TouchableOpacity>
            <View style={Container.blocosEsquerdo}>
                <View style={Container.headerContent}>
                    <Image style={Container.avatar}
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
                    <Text style={Container.name}>Matheus Silva</Text>
                    <Text style={Container.userInfo}>Estudante</Text>
                </View>          
            </View>
            <View style={Container.blocosEsquerdo}>
                <View style={Container.headerContent}>
                    <Image style={Container.avatar}
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
                    <Text style={Container.name}>Matheus Silva</Text>
                    <Text style={Container.userInfo}>Estudante</Text>
                </View>          
            </View>
            <View style={Container.blocosEsquerdo}>
                <View style={Container.headerContent}>
                    <Image style={Container.avatar}
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
                    <Text style={Container.name}>Matheus Silva</Text>
                    <Text style={Container.userInfo}>Estudante</Text>
                </View>          
            </View>
            <View style={Container.blocosDireito}>
                <View style={Container.headerContent}>
                    <Image style={Container.avatar}
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
                    <Text style={Container.name}>Matheus Silva</Text>
                    <Text style={Container.userInfo}>Estudante</Text>
                </View>          
            </View>
            <View style={Container.blocosDireito}>
                <View style={Container.headerContent}>
                    <Image style={Container.avatar}
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
                    <Text style={Container.name}>Matheus Silva</Text>
                    <Text style={Container.userInfo}>Estudante</Text>
                </View>          
            </View>
            <View style={Container.blocosDireito}>
                <View style={Container.headerContent}>
                    <Image style={Container.avatar}
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
                    <Text style={Container.name}>Matheus Silva</Text>
                    <Text style={Container.userInfo}>Estudante</Text>
                </View>          
            </View>

          <View style={Container.header}>
         

            <View style={Container.headerContent}>
                <Image style={Container.avatar}
                  source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
                <Text style={Container.name}>Matheus Silva </Text>
                <Text style={Container.userInfo}>matheus.morsc@gmail.com</Text>
                <Text style={Container.userInfo}>Pedralva </Text>
            </View>          
            {/*<Text style={{color: "#6558f5", textAlign: 'center', bottom: 50, fontSize: 15}}>Centro Universitário de Itajubá - FEPI </Text>
                </View>

        

            <View style={Container.LogoBuzz}>
                <Onibus width="15%" height="45" />
                <Text style={Container.TextoLogo}>BUZZ</Text>
            </View>
           </ScrollView>
          
      </View>    
    );
}
*/



