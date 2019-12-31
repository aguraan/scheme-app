import Vue from 'vue'
import Vuex from 'vuex'
import {
    LOADING_START,
    LOADING_END,
    SNACKBAR_ON,
    SNACKBAR_OFF,
    SNACKBAR_SUCCESS,
    SNACKBAR_ERROR,
} from '@/mutation.types'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        // STATE
        operations: 0,
        snackbar: false,
        snackbarText: '',
        snackbarColor: 'info',
    },
    getters: {
        // GETTERS
        loading: ({ operations }) => !!operations,
        operations: ({ operations }) => operations,
        snackbarText: ({ snackbarText }) => snackbarText,
        snackbarColor: ({ snackbarColor }) => snackbarColor,
        snackbar: ({ snackbar }) => snackbar,
    },
    mutations: {
        // MUTATIONS
        [LOADING_START]: state => state.operations++,
        [LOADING_END]: state => state.operations--,
        [SNACKBAR_ON]: state => state.snackbar = true,
        [SNACKBAR_OFF]: state => state.snackbar = false,
        [SNACKBAR_SUCCESS]: (state, payload = {}) => {
            state.snackbar = true
            state.snackbarColor = 'success'
            state.snackbarText = payload.text || ''
        },
        [SNACKBAR_ERROR]: (state, payload) => {
            state.snackbar = true
            state.snackbarColor = 'error'
            state.snackbarText = payload.text || ''
        }
    },
    actions: {
        // ACTIONS
    }
})