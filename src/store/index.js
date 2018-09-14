import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        illegalCarNum: '',
        nativeTitle:'',
        zhimaIdCardFinish:0,
        zhimaOldUserFinish:0,
        refreshCounter:0,
    },
    mutations: {
        setIllegalCarNum(state,str) {
            state.illegalCarNum=str;
        },
        setNativeTitle(state,str) {
            state.nativeTitle=str;
        },
        changeZmIdCardFinish(state){
            state.zhimaIdCardFinish++
        },
        changeZmOldUserFinish(state){
          state.zhimaOldUserFinish++
        },
        triggerRefresh(state){
          state.refreshCounter++
        }
    }
})

export default store
