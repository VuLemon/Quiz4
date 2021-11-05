import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';



export default function App() {
  let empty = [
    {
      id: "000000000",
      name: "None",
    }
  ]
  const [userID,setUserID] = useState("")
  const [text, setText] = useState("")
  const [length,setLength] = useState(1)
  const [showReps,setshowReps] = useState(false)
  const [data, setData] = useState(empty)

  
 


  const getData = async(userID) => {
    try{
    let data = await fetch("https://api.github.com/users/" + userID + "/repos")
    let result = await data.json()
    setData(result)
    } catch(e){
      console.log("error getting data")
    }
  }
  let a = data.length
  const renderitem = ({item}) => {
    return(
        <View style = {{flexDirection:"column", padding: 8}}>
          <Text style = {styles.item}> {item.name}
          </Text>
        </View>
    )
  }
  let Show = 
    <View>
        <TouchableOpacity
          color = "white"
          onPress = {() =>{
            setshowReps(!showReps)
            setLength(1)
          }}>
          <Text> Hide Repositories </Text>
          </TouchableOpacity>
          <FlatList
          data = {data}
          renderItem = {renderitem}
          keyExtractor = {item => item.id}
          />
    </View>

  
  let Hide =
      <View>
        <TouchableOpacity
          color = "white"
          onPress = {() => {
            setshowReps(!showReps)
            setUserID(text)
            setLength(a)
          }}>
          <Text> Show Repositories </Text>
          <FlatList
          data = {empty}
          renderItem = {renderitem}
          keyExtractor = {item => item.id}
          />
        </TouchableOpacity>
      </View>

  useEffect(()=> getData(userID),[userID])

  return (
    <View style = {{flex: 1}}>
      <View style = {styles.top}>
      </View>
      <View style = {styles.header}>
        <Text style ={styles.description}> Github Viewer
        </Text>
      </View>
      <View style = {styles.body}>
        <View style = {{flexDirection: "row"}}>
          <View style = {{flex: 1}}>
            <Text style = {styles.content}> 
              github ID:
            </Text>
          </View>
          <View style = {{flex:1.5}}>
            <TextInput style = {styles.description2}
              placeholder = "userid"
              onChangeText = {text => setText(text)} 
            />
          </View>
        </View>
        <View style = {{flex:1}}>
          {showReps ? Show:Hide}
        </View>
      </View>
      <View>
        <Text> DEBUGGING </Text>
        <Text> userID: {userID} </Text>
        <Text> showReps: {showReps?"true":"false"} </Text>
        <Text> repos.length = {length} </Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems:"center",
    backgroundColor: 'black',
    padding: 8,
  },
  description: {
    fontSize: 28,
    color: "red",
  },
  description2:{
    fontSize: 28,
  },
  body: {
    flex: 20,
    backgroundColor: 'white',
    padding: 8,
  },
  top: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  content: {
    fontSize: 28,
    color: "black",
  },
  item: {
    backgroundColor: "gray",
    fontSize:28,
  }
  

});
