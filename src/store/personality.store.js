import { db } from '@/firebaseConfig';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';

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
      try {
        const personalitiesCollection = collection(db, 'personality');
        const personalitySnapshot = await getDocs(personalitiesCollection);
        const personalityList = personalitySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        commit('setPersonalityList', personalityList);
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    },
    async incrementVote({ dispatch }, { personalityId, voteType }) {
      try {
        const personalityRef = doc(db, 'personality', personalityId);
        await updateDoc(personalityRef, {
          [`votes.${voteType}`]: increment(1),
        });
        dispatch('getPersonalities');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    },
  },
  getters: {
    personalityList: (state) => state.personalityList,
  },
};