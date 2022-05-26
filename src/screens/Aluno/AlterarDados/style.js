import { StyleSheet } from "react-native";

export const Container = StyleSheet.create(
    {
        MainContainer: {
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
        },
        check:{
            width: "80%",
            flexDirection: 'row',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 10
        },
        TextoTitulo:{
            fontSize: 33,
            marginTop: 80,
            marginBottom: 40,
            color:"#6558f5",
        },
        InputArea: {
            flex: 1,
            margin: 25,
            alignItems: "center",
            
        },
        input:{
            top: 10,
            padding: 6,
            marginTop:1,
            width: 366,
            height: 35,
            borderColor: '#000',
            fontSize: 16,
            fontWeight: 'bold',
            margin: "-4%",
            borderBottomWidth: 1,
            fontSize: 16,       
          },
        InputLogin:{
            alignItems: "center",
            bottom: 15              
        },
        Texto:{
            top: 10,
            color:"#6558f5",
            fontSize:22,
            marginTop: 30,
            textAlign: 'auto',
            width: 365
        },
        botaoText:{
            color: "#FFF",
            fontSize: 18,
            fontWeight: 'bold'
        },
        botao:{
            backgroundColor: '#6558f5',
            width: 355,
            borderRadius: 6,
            paddingVertical: 8,
            marginTop: 18,
            justifyContent: 'center',
            alignItems: 'center'
        },
        textoCadastro:{
            justifyContent:"center",
            marginTop: 20,
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
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        warningAlert:{
            paddingLeft: 10,
            color: "red",
            fontSize: 16
        },
        avatar: {
            width: 130,
            height: 130,
            borderRadius: 63,
            borderWidth: 1,
            borderColor: "#6558f5",
            bottom: 20,
          },
          touchMenu:{
            marginTop:40,
            backgroundColor:'#6558f5',
            width:50,
            height:50,
            zIndex:999
          },
    }
)