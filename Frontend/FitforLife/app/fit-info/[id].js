import { Stack, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { SafeAreaView, Text, View , Image, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import data from '../(drawer)/Home/data';
import { useEffect, useState } from 'react';
const Fit = () => {
    const router = useRouter()
    const params = useGlobalSearchParams()
    const items = useLocalSearchParams()
    const fitness = data
    console.log(fitness,"data")
    const [exercises , setExercises] = useState([])
    // console.log(items)
    useEffect(()=>{
        fitness.filter((el)=>{
            if(params.id===el.id){
                setExercises(el.excersises)
            }
        })
    },[])
    
    console.log(exercises,"exercises")
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "white",marginTop:4 }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerShadowVisible: false,
                    headerTitle: "EXERCISES"
                }}
            />

            <View style={{backgroundColor: "white"}}>
                <Image style={{width:"100%" , height:200 , position:"relative" , bottom:"10px"}} source={{uri:params.image}} />
                <Ionicons style={{position:"absolute"}} name="arrow-back-outline" size={28} color="white"  onPress={()=>router.push("(drawer)/Home")}/>

                {
                    exercises.map((el)=>(
                        <TouchableOpacity style={{margin:10 , flexDirection:"row" , alignItems:"center"}} key={el.id}>
                            <Image style={{width:90 , height:90}} source={{uri:el.image}} />
                            <View style={{marginLeft:10}}>
                                <Text style={{fontSize:17,fontWeight:"bold"}}>{el.name}</Text>
                                <Text style={{marginTop:4 , fontSize:16 , color:"gray"}}>x{el.sets}</Text>
                            </View>
                            
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
  )
}

export default Fit