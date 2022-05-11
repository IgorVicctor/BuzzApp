import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import { styles } from './style';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import firebase from "../../../config/firebaseconfig.js";

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