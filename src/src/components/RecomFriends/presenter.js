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
   
class RecomFriends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : []
        } 
    } 
    renderItem = ({ item }) => {
        const { navigation } = this.props;
        const token = this.state.token
        const username = this.state.username
        return(
        <TouchableOpacity onPress={() => navigation.navigate('FriendDetail', {
            username : item.username,
            token : token
          })}  
          key={item.id}>
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri : `http://222.111.115.100:8000${item.profile_image}`}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize:14 }}>{item.username}</Text>
                    <Text style={{ fontSize:10, marginTop:2 }}>#{item.tags[0]} #{item.tags[1]} #{item.tags[2]}</Text>
                </View>
            </View>
        </TouchableOpacity>
        )
    }   
    async componentDidMount() {
        const token = this.props.navigation.getParam('token','NO-token')
        const username = this.props.navigation.getParam('username','NO-username')

        this.setState({token: token})
        return fetch(`http://222.111.115.100:8000/users/${username}/findRecomUsers/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "content-type" : "application/json",
                'Authorization' : `JWT ${token}`
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data : responseJson
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }    
    render() {
        return(
            <FlatList
                horizontal = {true}
                data = {this.state.data}
                renderItem = {this.renderItem}
            /> 
        )
    }
}
export default RecomFriends; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});