import React from 'react';
import { View,  TouchableOpacity, Text, Image, TextInput, ScrollView} from 'react-native';
import { Container } from './style';

import Onibus from '../../../img/Onibus.svg';
import Icon from 'react-native-vector-icons/Entypo';

import ImagePicker from 'react-native-image-picker';


export default function PerfilMotorista({navigation}){

/*function imagePickerCallback(data){
  console.log(data)
}*/

    return(
        <View style={Container.container}>
     
          <ScrollView>
          <View style={Container.header}>
          
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={Container.touchMenu}>
            <Icon style={{ left: 5, width: 50,}} name="menu" size={45} color='#fff'/>
          </TouchableOpacity>

            <View style={Container.headerContent}>
                <Image style={Container.avatar}
                  source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU'}}/>
                  <TouchableOpacity 
                  /*onPress={() => ImagePicker.launchImageLibrary({},imagePickerCallback)}*/>
                  {/*<Text style={{fontSize: 12,paddingHorizontal: 3, borderWidth: 1, borderRadius: 5, textAlign:"center", top: 20, marginBottom: 21}}>Selecionar foto</Text>*/}
                  </TouchableOpacity>

                  <Text style={Container.name}>José Silva</Text>
                  <Text style={Container.userInfo}>jose.silva@gmail.com</Text>
                  <Text style={Container.userInfo}>Itajubá</Text>
            </View>
            {/*<Text style={{color: "#6558f5", textAlign: 'center', bottom: 50, fontSize: 15}}>Centro Universitário de Itajubá - FEPI </Text>*/}
          </View>
            <View style={Container.info}>
              <Text style={Container.Texto}>Empresa:<Text style={Container.Input}>X</Text></Text>
              <Text style={Container.Texto}>Ônibus:<Text style={Container.Input}>Y</Text></Text>
              <Text style={Container.Texto}>.. : <Text style={Container.Input}>..</Text></Text>
              <Text style={Container.Texto}>Dias de uso:<Text style={Container.Input}>Seg/Ter/Qua/Qui/Sex</Text></Text>
            </View>
            
        </ScrollView>
        <View style={Container.LogoBuzz}>
                    <Onibus width="15%" height="45" />
                    <Text style={Container.TextoLogo}>BUZZ</Text>
             </View>
      </View>    
    );
}


