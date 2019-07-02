import * as types from './mutation-types'

export default {
  [types.SET_NETWORK](state, { network }) {
    let newNetwork = {
      name: '',
      chainId: '',
      url: '',
      ...network
    }
    chrome.storage.sync.set({ ...newNetwork }, function() {
      console.log('Network Saved')
    })
    state.network = newNetwork
  }
}
