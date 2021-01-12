import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  slideInDown,
  slideInRight,
  slideOutLeft,
} from '../../../assets/animations';
import {_auth, _database} from '../../../assets/config';
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
    backgroundColor: '#1eb100',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 10,
    marginTop: '150%',
    borderRadius: 50,
    fontSize: 16,
    fontFamily: 'Quicksand-Light',
  },
  editBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: 'Quicksand-SemiBold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: 'Quicksand-Light',
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 4,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  inputFieldText: {
    fontSize: 18,
    color: '#929292',
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'Quicksand-Regular',
  },
  input: {
    marginRight: 10,
    fontSize: 20,
    fontFamily: 'Quicksand-Medium',
    color: '#000',
    flex: 1,
  },
  field: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 2,
  },
  inputIcon: {
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 10,
    marginLeft: 15,
  },
  btn: {
    marginBottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    marginRight: 5,
    marginLeft: 5,
  },
  editBtn: {
    backgroundColor: '#1eb100',
    elevation: 2,
    borderRadius: 50,
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  editBtnText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    padding: 10,
  },
  textLink: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
    color: '#111',
    fontFamily: 'Quicksand-Light',
    fontSize: 16,
    borderColor: '#fff',
    borderBottomColor: '#1eb100',
    borderWidth: 2,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    marginBottom: 20,
  },
});
export default class MyInfo extends Component {
  state = {
    loading: true,
    close: false,
    userName: '',
    title: '',
    idNumber: '',
    practice: '',
  };
  render() {
    return (
      <Animatable.View
        animation={this.state.close === false ? slideInRight : slideOutLeft}
        style={style.mainContent}>
        <Animatable.View
          delay={500}
          style={style.editBox}
          animation={slideInDown}>
          <Text style={style.title}>Enter your information</Text>
          <ScrollView>
            <View style={style.inputField}>
              <Text style={style.inputFieldText}>*Title</Text>
              <View style={style.field}>
                <Image
                  source={require('../../../assets/drawable/icon-account.png')}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Dr."
                  onChangeText={(x) => {
                    this.setState({title: x});
                  }}
                  value={this.state.title}
                />
              </View>
            </View>
            <View style={style.inputField}>
              <Text style={style.inputFieldText}>*Full Name</Text>
              <View style={style.field}>
                <Image
                  source={require('../../../assets/drawable/icon-account.png')}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Peter Kirui"
                  onChangeText={(x) => {
                    this.setState({userName: x});
                  }}
                  value={this.state.userName}
                />
              </View>
            </View>
            <View style={style.inputField}>
              <Text style={style.inputFieldText}>*Id Number</Text>
              <View style={style.field}>
                <Image
                  source={require('../../../assets/drawable/field-password.png')}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Id Number"
                  onChangeText={(x) => {
                    this.setState({idNumber: x});
                  }}
                  value={this.state.idNumber}
                />
              </View>
            </View>
            <View style={style.inputField}>
              <Text style={style.inputFieldText}>*Major Practice</Text>
              <View style={style.field}>
                <Image
                  source={require('../../../assets/drawable/field-password.png')}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Clinical Medicine"
                  onChangeText={(x) => {
                    this.setState({practice: x});
                  }}
                  value={this.state.practice}
                />
              </View>
            </View>
          </ScrollView>
          <Animatable.View
            delay={500}
            style={style.btn}
            animation={slideInDown}>
            <TouchableOpacity
              style={style.editBtn}
              onPress={async () => {
                await setTimeout(async () => {
                  if (
                    this.state.userName.length !== 0 &&
                    this.state.idNumber.length !== 0 &&
                    this.state.title.length !== 0 &&
                    this.state.practice.length !== 0
                  ) {
                    this.props.openSnack('Saving');
                    await _database
                      .ref('doctors/' + _auth.currentUser.uid)
                      .once('value', async (x) => {
                        this.props.closeSnack();
                        await x.child('userName').ref.set(this.state.userName);
                        await x.child('idNumber').ref.set(this.state.idNumber);
                        await x.child('title').ref.set(this.state.title);
                        await x.child('practice').ref.set(this.state.practice);
                        this.setState({close: true});
                        await setTimeout(() => {
                          this.props.openTimedSnack('Save Successfull');
                        }, 100);
                        await setTimeout(() => {
                          this.props.closeInfo();
                        }, 500);
                      })
                      .catch(async () => {
                        this.props.closeSnack();
                        await setTimeout(() => {
                          this.props.openTimedSnack('Save Failed');
                        }, 100);
                      });
                  } else {
                    this.props.openTimedSnack('All fields are required!');
                  }
                }, 100);
              }}>
              <Text style={style.editBtnText}>Update Info</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
    );
  }
}

export class SetDp extends Component {
  render() {
    return (
      <Animatable.View
        animation={this.state.close === false ? slideInRight : slideOutLeft}
        style={style.mainContent}>
        <Animatable.View
          delay={500}
          style={style.editBox}
          animation={slideInDown}>
          <Text style={style.title}>
            Your required to take a current photo of you
          </Text>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
