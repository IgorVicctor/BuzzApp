import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
        container:{
          flex:1,
          marginTop: 15,
        },
        list: {
          paddingHorizontal: 5,
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
          paddingHorizontal: 16,
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
          fontSize:14,
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
          fontSize:20,
        },
        icon:{
          height: 20,
          width: 20, 
        },
        modalBackGround: {
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: "center",
          alignItems: "center"
        },
        modalContainer: {
          width: '90%',
          height: 315,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 30,
          borderRadius: 20,
          elevation: 20
        }, 
        header: {
          bottom: 10,
          width: '100%',
          height: 570,
          alignItems: 'flex-end',
          justifyContent: 'center',
        },       
        Texto:{
          fontSize:20,
          fontWeight: 'bold',
          padding: 5,
          color: "#6558f5",
          alignItems: 'center',
        },
        Input:{
          fontSize:20,
          color: '#000'
        },
      });    

      