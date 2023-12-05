import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity
} from "react-native";

class MyIngProject extends Component {
    constructor() {
        super();
        this.state = {
            data : []
        }
    }
    _keyExtractor = (item, index) => item.key;
    renderItem = ({ item }) => {
        const { navigation } = this.props;
        const token = this.state.token

        return (//change uri 
        <TouchableOpacity onPress={() => navigation('ProjectDetail', {
            itemId : item.id,
            token:token,

          })}>
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri : `http://222.111.115.100:8000`+item.file}}//change this
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize:14 }}>{item.title}</Text>
                    <Text style={{ fontSize:10, marginTop:2 }}>#{item.tags[0]} #{item.tags[1]} #{item.tags[2]}</Text>
                </View>
            </View>  
        </TouchableOpacity>          
        )
    }
    componentDidMount() {
        const token = this.props.navigation.getParam('token','NO-token')
        const username = this.props.navigation.getParam('username','NO-username')
        return fetch(`http://222.111.115.100:8000/users/${username}`, {//change this
            method: 'GET',
            credentials:'include',
              headers: {
                "content-type" : "application/json",
                'Authorization' : `JWT ${token}`
              }            
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data : responseJson.projects
            })
        })
        .catch((error) => {
            console.error(error)
        })
    } 
    render() {
        return(
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    //keyExtractor={this._keyExtractor}
                />
            </ScrollView>
        )
    }

}
export default MyIngProject;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});