import React, { useState, useEffect } from 'react';
import { Text, View, Button, Modal, TouchableOpacity, Image, Animated, FlatList} from 'react-native';
import { styles, data } from './style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ScrollView } from 'react-native-gesture-handler';
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
  const [text, setText] = useState('Ainda não scanneado');
  const [assento, setAssento] = useState(0);
  const [dados, setDados] = useState([]);

  const page1 = data.seats.filter((x) => x.zIndex == 1);
  const columnCount = Math.max(...page1.map(o => o.row));

  useEffect(() => {
    database.collection("UsuariosNoOnibus").onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      }); 
      setDados(list);
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

  const handleBarCodeScanned = ({  data }) => {
    database
    .collection("Usuarios")
    .doc(data)
    .get()
    .then((doc) => {
      database.collection("UsuariosNoOnibus").doc(data).set({
        cidade: doc.data().cidade,
        curso: doc.data().curso,
        email: doc.data().email,
        faculdade: doc.data().faculdade,
        nome: doc.data().nome,
        periodo: doc.data().periodo,
        image: doc.data().image,
      })
    });

    setAssento(assento + 1);
    setVisible(true);
    setScanned(true);
  };

  return (
    <View style={styles.container}>
      <View>
       <TouchableOpacity  style={{bottom: 180, right: 165}} onPress={() => navigation.openDrawer()}>
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
    
        <View style={{bottom: 575, right: 50}}>
          {page1.map((item) => (
            <View
              style={{
                width: 30 * item.width,
                height: 25 * item.length,
                //backgroundColor: '#BA55D3',
                backgroundColor: 'green',
                margin: 80,
                position: 'absolute',
                left: (columnCount - item.row) * 50,
                top: item.column * 40,     
              }}>       
            </View>
          ))}
        </View>

	    <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold', bottom: 25}}>O aluno foi adicionado ao ônibus!</Text>
      <Text style={{marginVertical: 5, fontSize: 18, textAlign: 'center', fontWeight: 'bold', bottom: 20}}>Lugares ocupados: {assento}</Text>

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

        </ScrollView>
      </ModalPoup>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Scannear de novo?'} onPress={() => setScanned(false)} color='#8A2BE2' />}
    </View>
  );
}