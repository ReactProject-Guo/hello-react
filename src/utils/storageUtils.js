import store from 'store';
const LOCAL_USER = "local_user";
const LOCAL_LANG = "local_lang";
/**
 * https://github.com/marcuswestin/store.js
 */

export default {
  /**
   * @param {*} user 用户登录的信息
   * 向本地存储中储存用户信息
   */
  setUser(user) {
    store.set(LOCAL_USER, user);
  },
  /**
   * 获取本地存储用户信息
   */
  getUser() {
    return store.get(LOCAL_USER) || '{}';
  },
  removeUser() {
    store.remove(LOCAL_USER);
  },

  setLang(lang) {
    store.set(LOCAL_LANG,lang);
    window.location.reload(true);
  },
  getLang() {
    return store.get(LOCAL_LANG) || '';
  },
  removeLang() {
    store.remove(LOCAL_LANG);
    window.location.reload(true);
  }

}