import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableOpacity, Image, Animated} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
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

  const[visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Ainda não scanneado');
  const [assento, setAssento] = useState(0);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({  data }) => {

    setScanned(true);
    
    database.collection("UsuariosNoOnibus").doc(data).set({
      usuario: data
    })
    
    
    setAssento(assento + 1);

    setVisible(true);
    
    setText("");
    //console.log(data)
  };

  // Check permissions and return the screens
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

  const page1 = data.seats.filter((x) => x.zIndex == 1);
  const columnCount = Math.max(...page1.map(o => o.row));

  // Return the View
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
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity style={{bottom: 275, left: 5}} onPress={() => setVisible(false)}>
              <Image
                source={require('../../../img/x.png')} 
                style={{height: 30, width: 30}}
                />
            </TouchableOpacity>  
          </View>
        </View>
    
        <View style={{bottom: 580, right: 50}}>
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

	    <Text style={{marginVertical: 5, fontSize: 18, textAlign: 'center', fontWeight: 'bold', bottom: 5}}>O aluno foi adicionado ao ônibus!</Text>
      <Text style={{marginVertical: 5, fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>Lugares ocupados: {assento}</Text>
      
      </ModalPoup>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Scannear de novo?'} onPress={() => setScanned(false)} color='#8A2BE2' />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: '#8A2BE2'
    },
    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: "center",
      alignItems: "center"
    },
    modalContainer: {
      width: '85%',
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20
    }, 
    header: {
      width: '100%',
      height: 550,
      alignItems: 'flex-end',
      justifyContent: 'center',

    }
  });

  export const data = {
    seats: [
      {
        column: '6',
        length: '2',
        name: '36',
        row: '1',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '6',
        length: '2',
        name: '26',
        row: '2',
        width: '1.5',
        zIndex: '1',
      },
    
      {
        column: '8',
        length: '2',
        name: 'U15',
        row: '1',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '8',
        length: '2',
        name: 'U14',
        row: '2',
        width: '1.5',
        zIndex: '1',
      }, 
      {
        column: '10',
        length: '1',
        name: 'U16',
        row: '2',
        width: '3.2',
        zIndex: '1',
      },
      {
        column: '0',
        length: '2',
        name: 'U3',
        row: '1',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '0',
        length: '2',
        name: 'U2',
        row: '2', 
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '2',
        length: '2',
        name: 'U6',
        row: '1',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '2',
        length: '2',
        name: 'U5',
        row: '2',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '4',
        length: '2',
        name: 'U9',
        row: '1',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '4',
        length: '2',
        name: 'U8',
        row: '2',
        width: '1.5',
        zIndex: '1',
      },  
      {
        column: '0',
        length: '2',
        name: 'A1',
        row: '5',
        width: '1.5',
        zIndex: '1',
      },      
      {
        column: '0',
        length: '2',
        name: 'B1',
        row: '4',
        width: '1.5',
        zIndex: '1',
      }, 
      {
        column: '2',
        length: '2',
        name: 'A2',
        row: '5',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '2',
        length: '2',
        name: 'B2',
        row: '4',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '4',
        length: '2',
        name: 'B3',
        row: '4',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '4',
        length: '2',
        name: 'A3',
        row: '5',
        width: '1.5',
        zIndex: '1',
      },
      
      {
        column: '6',
        length: '2',
        name: 'B4',
        row: '4',
        width: '1.5',
        zIndex: '1',
      }, 
      {
        column: '6',
        length: '2',
        name: 'A4',
        row: '5',
        width: '1.5',
        zIndex: '1',
      },     
      {
        column: '8',
        length: '2',
        name: 'B5',
        row: '4',
        width: '1.5',
        zIndex: '1',
      },
      {
        column: '8',
        length: '2',
        name: 'A5',
        row: '5',
        width: '1.5',
        zIndex: '1',
      },
    ],
  }; 
