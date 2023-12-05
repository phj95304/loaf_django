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

class RecomProjects extends Component {
    constructor() {
        super()
        this.state = {
            data : []
        }
    }
    renderItem = ({ item }) => {
        const { navigation } = this.props;
        const token = this.state.token
        const username = this.state.username
        return(
            <TouchableOpacity onPress={() => navigation.navigate('ProjectDetail', {
                itemId : item.id,
                token : token
            })}  
            key={item.id}>
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri: `http://222.111.115.100:8000${item.file}`}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text>{item.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
        )
    } 
    componentDidMount() {
        const token = this.props.navigation.getParam('token','NO-token')
        const username = this.props.navigation.getParam('username','NO-username')
        this.setState({token: token})
        return fetch(`http://222.111.115.100:8000/users/${username}/findRecomProjects/`, {
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
export default RecomProjects;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});