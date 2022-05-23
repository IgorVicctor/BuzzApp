import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, Image, FlatList, TextInput, Modal, Animated} from 'react-native';
import { styles } from './style';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import firebase from "../../../config/firebaseconfig.js";
import { MaterialCommunityIcons } from '@expo/vector-icons';

{/*
const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  
 
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if(visible){
      setShowModal(true);
      Animated.spring(scaleValue,{
        toValue:1,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start();
    }
  };
  
  return (
  <Modal transparent visible={showModal}>
    <View style={styles.modalBackGround}>
      <Animated.View style={[styles.modalContainer,{transform:[{scale:scaleValue}]}]}>
        {children}
      </Animated.View>
    </View>
  </Modal>
  )
};
*/}
export default function ListaUsuarios({navigation, route}){

  const database = firebase.firestore();
  const [visible, setVisible] = useState(false);
  const [dados, setDados] = useState([]);
  const [dados2, setDados2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState();


  useEffect(() => {
    database.collection("Usuarios").onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      }); 
      setDados(list);
      setList(list);
    });
  }, [])

  useEffect(() => {
    if (searchText === '') {
      setList(dados);
    } else {
      setList(
        dados.filter(
          (item) =>
            item.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    let newList = [...list];

    newList.sort((a, b) => (a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0));

    setList(newList);
  };

    function info(item) {      
      database
        .collection("Usuarios")
        .doc(item.id)
        .get()
        .then((doc) => {
          setDados2([doc.data()]);
        });      
    }

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
      
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Icon style={{marginTop: 20, left: 10, width: 50}} name="menu" size={45} color='#6558f5' />    
        </TouchableOpacity>
          
          <View style={{left: 175, flexDirection: 'row'}}>
            <TextInput
              style={{borderWidth: 2, borderRadius: 10, borderColor:'#6558f5', height: 30, width: 140, top: 28, paddingHorizontal: 10, textAlign: 'justify', right: 15}}
              placeholder="Pesquisar"
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={(t) => setSearchText(t)}
            />

            <TouchableOpacity onPress={handleOrderClick} style={{top: 25}}>
              <MaterialCommunityIcons
                name="order-alphabetical-ascending"
                size={32}
                color="#6558f5"
                left='15'
              />
            </TouchableOpacity>
          </View>
        </View>
        {/*
        <ModalPoup visible={visible}> 
            <View style={{alignItems: 'center'}}>
              <View style={styles.header}>
                <TouchableOpacity style={{bottom: 260, right: 5}} onPress={() => setVisible(false)}>
                  <Image
                    source={require('../../../img/x.png')} 
                    style={{height: 30, width: 30}}
                    />
                </TouchableOpacity>  
              </View>
              <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'black', bottom: 570, color: '#6558f5'}}>INFORMAÇÃO</Text>
            </View> 

            <View style={{bottom: 545}} >
                <FlatList
                  showsVerticalScrollIndicator={true}   
                  keyExtractor={(item, index) => index.toString()}
                  data={dados2}
                  renderItem={( { item } ) =>{
                  return(
                    <View>
                          <Text style={styles.Texto}>Cidade: <Text style={styles.Input}>{item.cidade}</Text></Text>
                          <Text style={styles.Texto}>Faculdade: <Text style={styles.Input}>{item.faculdade}</Text></Text>
                          <Text style={styles.Texto}>Curso: <Text style={styles.Input}>{item.curso}</Text></Text>
                          <Text style={styles.Texto}>Período: <Text style={styles.Input}>{item.periodo}</Text></Text>
                          <Text style={styles.Texto}>Dias de uso: <Text style={styles.Input}>{item.diasdeuso}</Text></Text>
                    </View>    
                  )
                }}
                /> 
            </View>
        </ModalPoup>
        */}

        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={list}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() => {info(item), setVisible(true)}}>
                <View style={styles.cardHeader}>
                  
                </View>
                <Image style={styles.userImage} source={{ uri: item.image }}/>
                <View style={styles.cardFooter}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.name}>{item.nome}</Text>
                    <Text style={styles.position}>{item.email}</Text>
                    <TouchableOpacity style={styles.followButton} onPress={() => {info(item), setVisible(true)}}>
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
