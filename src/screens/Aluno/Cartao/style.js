import React from 'react';
import { StyleSheet, ActivityIndicator } from "react-native";

export const Container = StyleSheet.create({
      header:{
        height: 350,
        backgroundColor: "#6558f5",
      },
      headerContent:{
        bottom: 55,
        padding: 30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 3,
        borderColor: "white",
        marginBottom:10,
        top: 20
      },
      name:{
        flexGrow: 1,
        top: 22,
        fontSize:22,
        color:"#ffffff",
        fontWeight:'600',
      },
      userInfo:{
        top: 22,
        fontSize:16,
        color:"#ffffff",
        fontWeight:'600',
      },
      body:{
        backgroundColor: "#ffffff",
        height:500,
        alignItems:'center',
      },
      item:{
        flexDirection : 'row',
      },
      infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
      },
      iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
      },
      icon:{
        width:30,
        height:30,
        marginTop:20,
      },
      info:{
        fontSize:16,
        marginTop:20,
        color: "#6158f1",
      },
      LogoBuzz: {
        marginTop: 80,
        width: "100%",
        /*backgroundColor: "#b1b1b1",*/
        /*borderBottomWidth: 2,*/
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", 
      },
      TextoLogo: {
        color: "#45c",
        fontSize: 45,
        flexDirection: "row",
      },  
});




