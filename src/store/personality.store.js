import { db } from '@/firebaseConfig';
export default {
  namespaced: true,
  state: {
    personalityList: [],
  },
  mutations: {
    setPersonalityList(state, personalityList) {
      state.personalityList = personalityList;
    },
  },
  actions: {
    getPersonalities({ commit }) {
      db.collection('personality')
        .get()
        .then((snapshot) => {
          let personalityList = [];
          snapshot.forEach((doc) => {
            let item = doc.data();
            item.id = doc.id;
            personalityList.push(item);
          });
          commit('personalityList', personalityList);
        });
    },
  },
  getters: {
    personalityList: (state) => state.personalityList,
  },
};
