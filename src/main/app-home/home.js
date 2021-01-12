/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {PulseIndicator} from 'react-native-indicators';
import {fadeIn, slideInDown, slideInRight} from '../../assets/animations';
import {_auth, _database} from '../../assets/config';
import MyInfo, {SetDp} from './my-info/my-info';
const style = StyleSheet.create({
  mainContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#d4fffe',
  },
  loader: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    top: 0,
    marginTop: '70%',
  },
  loaderText: {
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: '#118fca',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 10,
    marginTop: '150%',
    borderRadius: 50,
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
  },
  navBar: {
    position: 'absolute',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#fff',
    height: 60,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 4,
    borderColor: '#ece4e4',
    borderWidth: 1,
    flexDirection: 'row',
  },
  bgImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
  },
  navItemIcon: {
    height: 25,
    width: 25,
    marginTop: 5,
    marginBottom: 2,
    alignSelf: 'center',
  },
  navItemText: {
    alignSelf: 'center',
    fontFamily: 'Quicksand-Regular',
    color: '#999',
    marginBottom: 5,
  },
});
export default class Home extends Component {
  state = {loading: true, init: undefined};
  async componentDidMount() {
    await _database.ref('doctors/' + _auth.currentUser.uid).on('value', (x) => {
      if (x.hasChild('userName') === false) {
        this.setState({init: true});
      }
      if (x.hasChild('userDp') === false) {
        this.setState({setDp: true});
      }
      this.setState({loading: false});
    });
  }
  render() {
    return (
      <Animatable.View animation={fadeIn}>
        <StatusBar barStyle="dark-content" backgroundColor="#d4fffe" />
        {this.state.loading === true ? (
          <View style={style.mainContent}>
            <PulseIndicator color={'#118fca'} style={style.loader} size={100} />
            <Text style={style.loaderText}>Please Hold...</Text>
          </View>
        ) : this.state.init ? (
          <MyInfo
            openSnack={this.props.openSnack}
            openTimedSnack={this.props.openTimedSnack}
            closeSnack={this.props.closeSnack}
            closeInfo={() => {
              this.setState({init: undefined});
            }}
          />
        ) : this.state.setDp ? (
          <SetDp />
        ) : (
          <LandingPage
            openSnack={this.props.openSnack}
            openTimedSnack={this.props.openTimedSnack}
            closeSnack={this.props.closeSnack}
          />
        )}
      </Animatable.View>
    );
  }
}

class LandingPage extends Component {
  state = {
    currentscreen: 'home',
  };
  render() {
    return (
      <Animatable.View animation={slideInRight} style={style.mainContent}>
        {this.state.currentscreen === 'home' ? <View /> : <View />}
        <Animatable.View
          animation={slideInDown}
          delay={200}
          style={style.navBar}>
          <TouchableOpacity
            style={
              this.state.currentscreen === 'home'
                ? {
                    ...style.navItem,
                    backgroundColor: '#1eb100',
                    borderTopLeftRadius: 10,
                  }
                : {...style.navItem, borderTopLeftRadius: 10}
            }
            onPress={async () => {
              if (this.state.currentscreen !== 'home') {
                await setTimeout(() => {
                  this.setState({currentscreen: 'home'});
                }, 100);
              }
            }}>
            <Image
              source={require('../../assets/drawable/icon-home.png')}
              style={style.navItemIcon}
            />
            <Text
              style={
                this.state.currentscreen === 'home'
                  ? {
                      ...style.navItemText,
                      color: '#fff',
                      fontFamily: 'Quicksand-Medium',
                    }
                  : style.navItemText
              }>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.currentscreen === 'favourite'
                ? {...style.navItem, backgroundColor: '#1eb100'}
                : style.navItem
            }
            onPress={async () => {
              if (this.state.currentscreen !== 'favourite') {
                await setTimeout(() => {
                  this.setState({currentscreen: 'favourite'});
                }, 100);
              }
            }}>
            <Image
              source={require('../../assets/drawable/icon-favourite.png')}
              style={style.navItemIcon}
            />
            <Text
              style={
                this.state.currentscreen === 'favourite'
                  ? {
                      ...style.navItemText,
                      color: '#fff',
                      fontFamily: 'Quicksand-Medium',
                    }
                  : style.navItemText
              }>
              Chat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.currentscreen === 'profile'
                ? {
                    ...style.navItem,
                    backgroundColor: '#1eb100',
                    borderTopRightRadius: 10,
                  }
                : {...style.navItem, borderTopRightRadius: 10}
            }
            onPress={async () => {
              if (this.state.currentscreen !== 'profile') {
                await setTimeout(() => {
                  this.setState({currentscreen: 'profile'});
                }, 100);
              }
            }}>
            <Image
              source={require('../../assets/drawable/icon-profile.png')}
              style={style.navItemIcon}
            />
            <Text
              style={
                this.state.currentscreen === 'profile'
                  ? {
                      ...style.navItemText,
                      color: '#fff',
                      fontFamily: 'Quicksand-Medium',
                    }
                  : style.navItemText
              }>
              Profile
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
