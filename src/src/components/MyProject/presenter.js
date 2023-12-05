import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import {createStackNavigator} from 'react-navigation';
import MasterProjects from "../MasterProjects/master";
import CompleteProject from "../CompleteProject/presenter";
import MyIngProjects from "../MyIngProjects/presenter";

const { height, width } = Dimensions.get('window')

class Projects extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Projects',	
    }); 
    constructor(props) {
        super(props)
        this.state = {
            token: "",
            username: ""
        }
    }
    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const token = this.props.navigation.getParam('token','NO-token')
        const username = this.props.navigation.getParam('username','No-username')
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                <View style={{ alignItems:"center", backgroundColor:"white"}}>
                    <TouchableOpacity style={styles.board} 
                        onPress={() => navigate('ProjectForm',{
                            token:token})
                        }>
                        <Text>프로젝트 등록하기</Text>  
                    </TouchableOpacity> 
                </View>
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                    <View>
                        <View style={{ backgroundColor: 'white'}}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                마스터 프로젝트
                            </Text>
                            <View style={{ height: 130, marginTop: 20 }}>
                                <MasterProjects 
                                    navigation={this.props.navigation} 
                                    token = {this.props.token}
                                    username = {this.props.username}/>
                            </View>
                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', marginBottom:15 }}>
                                    진행중인 프로젝트
                                </Text>
                                <View style={{ height: 130, marginTop: 20 }}>
                                    <MyIngProjects 
                                        navigation={this.props.navigation} 
                                        token = {this.props.token}
                                        username = {this.props.username}/>
                                </View>
                            </View>
                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', marginBottom:15 }}>
                                    완료한 프로젝트
                                </Text>
                                <View style={{ height: 130, marginTop: 20 }}>
                                    <CompleteProject 
                                        navigation={this.props.navigation} 
                                        token = {this.props.token}
                                        username = {this.props.username}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
export default Projects;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    board: {
        marginTop: 20,
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:200,
        borderRadius:30,
        borderColor: '#000',
        borderWidth: 0.5,
        marginBottom:20
    },
});