import React from "react";
import { StyleSheet } from "react-native";

export const Container = StyleSheet.create({
        MainContainer: {
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center"
        },
        TextoTitulo:{
            fontSize: 33,
            marginBottom: 50,
            color:"#6558f5",
            top: 10
        },
        InputArea: {
            /*flex: 1,*/
            /*backgroundColor: "#fff",*/
            margin: 15,
            alignItems: "center",
        },
        input:{
            padding: 10, 
            marginTop:10,
            width: 275,
            height: 45,
            color: '#6558f5',
            borderColor: '#dfe6ed',
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: 4,
            borderWidth: 2,
            margin: "-4%"
          },
        InputLogin:{
            alignItems: "center",
        },
        Texto:{
            color:"#6558f5",
            fontSize:25,
            marginRight: 200,
            marginTop: 15,
            top: 10,
        },
        botaoText:{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#fff'
        },
        botao:{
            width: 80,
            height: 42,
            backgroundColor: '#6558f5',
            marginTop: 33,
            borderRadius: 3,
            alignItems: 'center',
            justifyContent: 'center'
        },
        textoCadastro:{
            justifyContent:"center",
            marginTop: 25,
            fontSize: 17,
            flexDirection: "row",     
        },
        LogoBuzz: {
            marginTop: 50,
            height: 80,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",      
        },
        TextoLogo: {
            color: "#6558f5",
            fontSize: 45,
            flexDirection: "row",
        },
        contentAlert:{
            top: 5,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        warningAlert:{
            paddingLeft: 10,
            color: "red",
            fontSize: 16
        }
    }
)
