import React , { Component } from 'react';
import { Alert , StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import {createStackNavigator,StackActions, NavigationActions} from 'react-navigation';

import JoinProject from './JoinProject/presenter'
import RecruitProject from './RecruitProject/presenter'
import RecomFriends from './RecomFriends/presenter'
import ProjectBoard from './ProjectBoard/presenter'
import FriendDetail from './FriendDetail/presenter'
import FriendsList from './FriendsList/presenter'
import ProjectDetail from './ProjectDetail/presenter'
import Message from './Message/message'
import AbilityForm from './AbilityForm/ability'
import MasterProjectDetail1 from './MasterProjectDetail/RemoveFri'
import MasterProjectDetail2 from './MasterProjectDetail/ChangeStatus'
import MasterProjectDetail3 from './MasterProjectDetail/test'
import MasterProjects from './MasterProjects/master'
import CompleteProject from './CompleteProject/ex'
import MyIngProjects from './MyIngProjects/presenter'

import Home from './Home/presenter'
import MyProject from './MyProject/presenter'
import Friends from './Friends/presenter'
import Projects from './Projects/presenter'
import MyProfile from './MyProfile/presenter'
import ContestInfo from './ContestInfo/info'
import ProfileForm from './ProfileForm/presenter'
import ProjectForm from './ProjectForm/presenter'
import Sample from './Sample/sample'
import Login from './log_in/Login'
import Logout from './log_out/Logout'
import ChangeStatus from './MasterProjectDetail/ChangeStatus'
import RemoveFri from './MasterProjectDetail/RemoveFri'

export default class MyNavigator extends React.Component{
  render(){
    return<MainNavigator/>;
    <SubNavigator/>;
  }
}



const MainNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Logout:{
    screen:Logout
  },
  Home: { 
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
    }, 
        
  },
  CompleteProject : {
    screen : 'CompleteProject'
  },

  MasterProjects : {
    screen : 'MasterProjects'
  },
  MyProject: { 
    screen: MyProject,
    navigationOptions: {
      tabBarLabel: 'MyProject',
    },
  },
  MyIngProjects : {
    screen : 'MyIngProjects'
  },
  MyProfile: { 
    screen:MyProfile,
    navigationOptions: {
      tabBarLabel: 'MyProfile',
    },
  },	
  Projects: { 
    screen: Projects,
    navigationOptions: {
      tabBarLabel: 'Projects',
    },    
  },	
  Friends: { 
    screen: Friends,
    navigationOptions: {
      tabBarLabel: 'Friends',
    },  
  },
  RecomFriends: {
    screen : RecomFriends
  },
  	
  FriendDetail: { 
    screen: FriendDetail, 
  },		
  ProjectDetail: {
    screen: ProjectDetail
  },
  Message: {
    screen: Message
  },
  AbilityForm: {
    screen: AbilityForm
  },
  MasterProjectDetail1: {
    screen: MasterProjectDetail1
  },
  MasterProjectDetail2: {
    screen: MasterProjectDetail2
  },
  MasterProjectDetail3: {
    screen: MasterProjectDetail3
  },
  ContestInfo : {
    screen : ContestInfo
  },
  ProfileForm : {
    screen : ProfileForm
  },
  ProjectForm : {
    screen : ProjectForm
  },
  Sample : {
    screen :Sample
  },
  ChangeStatus:{
    screen: ChangeStatus
  },
  RemoveFri:{
    screen: RemoveFri
  },
  initialRouteName : Home
  
})