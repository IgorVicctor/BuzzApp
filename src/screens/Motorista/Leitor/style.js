import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
      width: '90%',
      height: 700,
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

    },
    list: {
      marginTop: 10,
      paddingHorizontal: 5,
      borderWidth: 3,
      borderColor: "black",
      backgroundColor:"#E6E6E6",
    },
    listContainer:{
     alignItems:'center'
    },

    /******** card **************/
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
      marginVertical: 5,
      backgroundColor:"white",
      flexBasis: '46%',
      marginHorizontal: 5,
    },
    cardFooter: {
      paddingVertical: 17,
      paddingHorizontal: 2,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardHeader:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    userImage:{
      height: 120,
      width: 120,
      borderRadius:60,
      alignSelf:'center',
      borderColor:"#DCDCDC",
      borderWidth:3,
    },
    name:{
      fontSize:18,
      flex:1,
      alignSelf:'center',
      color:"#008080",
      fontWeight:'bold'
    },
    position:{
      fontSize:13,
      flex:1,
      alignSelf:'center',
      color:"#696969"
    },
    followButton: {
      marginTop:10,
      height:35,
      width:100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
    followButtonText:{
      color: "#FFFFFF",
      fontSize:18,
    },
    icon:{
      height: 20,
      width: 20, 
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
