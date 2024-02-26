import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

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
    async getPersonalities({ commit }) {
      const personalitiesCollection = collection(db, 'personality');
      const personalitySnapshot = await getDocs(personalitiesCollection);
      const personalityList = personalitySnapshot.docs.map((doc) => doc.data());
      commit('setPersonalityList', personalityList);
    },
  },
  getters: {
    personalityList: (state) => state.personalityList,
  },
};
