import React, { useState, useEffect } from 'react';
import { Text, View, Button, Modal, TouchableOpacity, Image, Animated, FlatList, Alert} from 'react-native';
import { styles, data } from './style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ScrollView } from 'react-native-virtualized-view';
import Icon from 'react-native-vector-icons/Entypo';
import firebase from "../../../config/firebaseconfig"

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

export default function Scanner({navigation}) {

  const database = firebase.firestore()
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();
  const [assento, setAssento] = useState(0);
  const [dados, setDados] = useState();

  const page1 = data.seats.filter((x) => x.zIndex == 1);
  const columnCount = Math.max(...page1.map(o => o.row));

  useEffect(() => {
    database
    .collection("Motoristas")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((doc) => {
      const nome = (doc.data().nome);
  
    database.collection("OnibusDo"+nome).onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      }); 
      setDados(list);
    });
  });
  }, [])

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Pedindo a permissão para usar a câmera</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Sem acesso à câmera</Text>
        <Button title={'Permitir câmera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  database
    .collection("Motoristas")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((doc) => {
      const nome = (doc.data().nome);
      database.collection("OnibusDo"+nome).get().then(snap => {
      
      let size = snap.size;
      setAssento(size)
    });
  });

  const handleBarCodeScanned = ({ data }) => {
    
  database
    .collection("Motoristas")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((doc) => {
      const nome = (doc.data().nome);
  
  database
    .collection("Usuarios")
    .doc(data)
    .get()
    .then((teste) => {
      if(teste.exists){   
        database
          .collection("OnibusDo"+nome)
          .doc(data)
          .get()
          .then((doc) => {
            if(doc.exists){
              
              Alert.alert(
                "Atenção",
                "O usuário já está dentro do ônibus!",
                [         
                  
                  {
                    text: "REMOVER USUÁRIO",
                    onPress: () => Alert.alert(
                      "Atenção",
                      "Voce deseja remover " + doc.data().nome + "?",
                      [
                        {
                          text: "SIM",
                          onPress: () => (database.collection("OnibusDo"+nome).doc(data).delete()),             
                          style: "cancel",
                        },
                        {
                          text: "NÃO",            
                          style: "cancel",
                        }
                      ]
                      ),             
                    style: "cancel",
                  },            
                  {
                    text: "OK",                   
                    style: "cancel",
                  },
                ],        
              );

            } else {
              database.collection("OnibusDo"+nome).doc(data).set({
                cidade: teste.data().cidade,
                curso: teste.data().curso,
                email: teste.data().email,
                faculdade: teste.data().faculdade,
                nome: teste.data().nome,
                periodo: teste.data().periodo,
                diasdeuso: teste.data().diasdeuso,
                image: teste.data().image,
              })
      
              Alert.alert(
                "Atenção",
                "O usuário foi adicionado ao ônibus!",
                [
                  {
                    text: "OK",
                    onPress: () => (setVisible(true), (assento)),             
                    style: "cancel",
                  },
                ],
              );        
            }
          });  
          
      } else{
        Alert.alert("Atenção", "Não foi encontrado nenhum usuário com esse perfil.");
      };
    });
    setText("");
    setScanned(true);
    });   
  };
  

  function remover(item) {   
    database
    .collection("Motoristas")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((doc) => {
      const nome = (doc.data().nome);
      let uid = item.id;
      Alert.alert(
        "Atenção",
        "Voce deseja remover " + item.nome + "?",
        [
          {
            text: "SIM",
            onPress: () => (database.collection("OnibusDo"+nome).doc(uid).delete()),             
            style: "cancel",
          },
          {
            text: "NÃO",            
            style: "cancel",
          }
        ]
      )
    });
  }


  return (
    <View style={styles.container}>
      <View>
       <TouchableOpacity  style={{bottom: 165, right: 165}} onPress={() => navigation.openDrawer()}>
            <Icon style={{width: 50}} name="menu" size={45} color='#6558f5'/>
        </TouchableOpacity>
        </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 420, width: 400 }} />
      </View>

      <ModalPoup visible={visible}>   
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity style={{bottom: 260, right: 5}} onPress={() => setVisible(false)}>
              <Image
                source={require('../../../img/x.png')} 
                style={{height: 30, width: 30}}
                />
            </TouchableOpacity>  
          </View>
        </View>
    
      <View style={{bottom: 575, right: 50}} >
          {page1.map((item, index) => (
            <View key={index}
              style={{
                width: 30 * item.width,
                height: 25 * item.length,
                backgroundColor: '#BA55D3',
                margin: 80,
                position: 'absolute',
                left: (columnCount - item.row) * 50,
                top: item.column * 40,     
              }}>       
            </View>
          ))}
            </View>
      
      <Text style={{marginVertical: 5, fontSize: 19, textAlign: 'center', bottom: 20}}>Lugares ocupados: <Text style={{fontWeight: 'bold' ,fontSize: 20}}>{assento}</Text></Text>
      
        <View>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={dados}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}  
            renderItem={({item}) => {
              return (
                <View style={styles.card} >
                  <View style={styles.cardHeader}>
                    
                  </View>
                  <Image style={styles.userImage} source={{uri:item.image}}/>
                  <View style={styles.cardFooter}>
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                      <Text style={styles.name}>{item.nome}</Text>
                      <Text style={styles.position}>{item.email}</Text>
                      <TouchableOpacity style={styles.followButton} onPress={() => remover(item)}>
                        <Text style={styles.followButtonText}>Remover</Text>  
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>  
              )
            }}/>
          </View>

        </ScrollView>
      </ModalPoup>
      <Text style={styles.maintext}>{text}</Text>
      
      {scanned && <Button title={'Scannear de novo?'} onPress={() => setScanned(false)} color='#8A2BE2' />}

      <TouchableOpacity style={{backgroundColor: '#8A2BE2', top: 80}} onPress={() => setVisible(true)}>
          <Text style={[styles.maintext, {color:"#fff", fontWeight: 'bold'}]}>ÔNIBUS</Text>
      </TouchableOpacity>
      
    </View>
  );
}