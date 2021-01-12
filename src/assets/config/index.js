import auth from '@react-native-firebase/auth';
import firebase from 'firebase';
import config from './config';

firebase.initializeApp(config());

export const _auth = auth();
export const _database = firebase.database();
export const _storage = firebase.storage();
export function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return dd + '.' + mm + '.' + yyyy;
}
export function getTime() {
  var today = new Date();
  var time =
    formatTime(today.getHours()) + ':' + formatTime(today.getMinutes());
  if (today.getHours() >= 12) {
    time = time + ' pm';
  } else {
    time = time + ' am';
  }
  return time;
}
export function formatTime(x) {
  return x <= 9 ? '0' + x : x;
}
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
