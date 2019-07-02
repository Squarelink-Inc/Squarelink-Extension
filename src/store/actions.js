import * as types from './mutation-types'
import Squarelink from 'squarelink'
import config from '@/config'

export const SET_NETWORK = ({ commit }, { network }) =>
  new Promise((resolve, reject) => {
    const { url, chainId, name } = network
    let networkOpts
    if (name) networkOpts = name
    else networkOpts = { url, chainId }
    try {
      let provider = new Squarelink(config.SQLK_ID, networkOpts)
      if (!provider) return reject('Unable to connect to that network')
      commit(types.SET_NETWORK, { network })
      return resolve()
    } catch (err) {
      return reject(err)
    }
  })
