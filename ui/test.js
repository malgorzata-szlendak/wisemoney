
import React from 'react'
import {View,Text} from 'react-native';


export default class TestComponent extends React.Component{
    render(){
        return(
            <View style={{
                paddingHorizontal:32,
                alignSelf:"center",
                marginTop:290,
                backgroundColor:"#FFF",
                height:386,
                elevation:1,
                width:270,
                borderRadius:15
            }}>
            </View>
        )
    }
}