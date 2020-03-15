import _ from 'lodash'
import { pender } from 'redux-pender'
import { createAction, handleActions } from 'redux-actions'
import { default as EthereumService } from 'web3'
import { getDate } from 'lib/utils'

/* Web3 API */
const getEthereum = () => {
  return new Promise(
    function (resolve, reject) {
      try {
        resolve(window.ethereum)
      } catch (error) {
        let err = { error: error, detail: 'Could not get window.ethereum' }
        reject(err)
      }
    }
  )
}

const getWeb3 = () => {
  return new Promise(
    function (resolve, reject) {
      try {
        resolve(window.web3)
      } catch (error) {
        let err = { error: error, detail: 'Could not get window.web3' }
        reject(err)
      }
    }
  )
}

const connect = (web3) => {
  return new Promise(
    function (resolve, reject) {
      try {
        resolve(new EthereumService(web3))
      } catch (error) {
        let err = { error: error, detail: 'Could not connect to EthereumService' }
        reject(err)
      }
    }
  )
}

export const GET_WEB3 = 'web3/GET_WEB3'
export const fetchWeb3 = createAction(GET_WEB3, getWeb3)

export const GET_ETHEREUM = 'web3/GET_ETHEREUM'
export const fetchEthereum = createAction(GET_ETHEREUM, getEthereum)

export const CONNECT = 'web3/CONNECT'
export const initializeEthereum = createAction(CONNECT, connect)


const initialState = {
  service: null,
  privacyMode: null,
  error: null,
  web3: null,
  updatedAt: getDate()
}

export default handleActions({
  ...pender({
    type: GET_WEB3,
    onSuccess: (state, { payload }) => {
      const newState = { ...state, updatedAt: getDate(), error: null }

      if(_.isUndefined(payload)){
        newState.error = 'Got Ether? Download Metamask!'
      } else {
        newState.web3 = payload
      }

      return newState
    },
    onFailure: (state, { payload }) => {
      return { ...state, error: payload }
    }
  }),
  ...pender({
    type: GET_ETHEREUM,
    onSuccess: (state, { payload }) => {
      const newState = { ...state, updatedAt: getDate(), error: null }

      if(_.isNull(state.web3)) {
        newState.error = 'Got Ether? Download Metamask!'
      }

      if(_.isUndefined(payload)) {
        newState.privacyMode = false
      } else {
        newState.web3 = payload
        newState.privacyMode = true
      }

      return newState
    },
    onFailure: (state, { payload }) => {
      return { ...state, error: payload }
    }
  }),
  ...pender({
    type: CONNECT,
    onSuccess: (state, { payload }) => {
      const newState = { ...state, updatedAt: getDate(), error: null }

      newState.service = payload
      newState.address = newState.service.currentProvider.publicConfigStore._state.selectedAddress

      return newState
    },
    onFailure: (state, { payload }) => {
      return { ...state, error: payload }
    }
  })
}, initialState)