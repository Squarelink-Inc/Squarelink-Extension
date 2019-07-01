import * as types from './mutation-types'

export default {
  [types.SET_NETWORK](state, { network }) {
    console.log(network)
    state.network = {
      name: '',
      chainId: '',
      url: '',
      ...network
    }
  }
}
