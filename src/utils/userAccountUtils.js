import { AsyncStorage } from 'react-native'

import getBalanceStore from '../store/balance'
import getTransactionStore from '../store/transactions'
import getCandidatesStore from '../store/candidates'
import { USER_STATUS, USER_FILTERED_TOKENS, VERIFIED_TOKENS, FAVORITE_EXCHANGES, USE_BIOMETRY, ALWAYS_ASK_PIN, ASK_PIN_EX } from './constants'

import { resetContactsData } from '../utils/contactUtils'
import { resetSecretData } from '../utils/secretsUtils'

export const resetWalletData = async () => {
  const [balanceStore, transactionStore] = await Promise.all([
    getBalanceStore(),
    getTransactionStore()
  ])
  const allBalances = balanceStore.objects('Balance')
  const allTransactions = transactionStore.objects('Transaction')
  await Promise.all([
    balanceStore.write(() => balanceStore.delete(allBalances)),
    transactionStore.write(() => transactionStore.delete(allTransactions))
  ])
}

export const buildFeaturedFilterString = (comparison = '==', logic = 'OR') =>
  VERIFIED_TOKENS.reduce((filter, token, index) => {
    filter += `name ${comparison} '${token}'`
    if (index + 1 < VERIFIED_TOKENS.length) {
      filter += ` ${logic} `
    }
    return filter
  }, '')

// This is used for testnet mainly
export const resetListsData = async () => {
  const candidatesStore = await getCandidatesStore()
  const candidateList = candidatesStore.objects('Candidate')
  await candidatesStore.write(() => candidatesStore.delete(candidateList))
}

export const hardResetWalletData = async (pin) => (
  Promise.all([
    resetWalletData(),
    resetListsData(),
    resetContactsData(),
    resetSecretData(pin),
    AsyncStorage.setItem(USER_STATUS, 'reset'),
    AsyncStorage.setItem(USER_FILTERED_TOKENS, '[]'),
    AsyncStorage.setItem(FAVORITE_EXCHANGES, '[]'),
    AsyncStorage.setItem(ASK_PIN_EX, 'true'),
    AsyncStorage.setItem(ALWAYS_ASK_PIN, 'true'),
    AsyncStorage.setItem(USE_BIOMETRY, 'false')
  ])
)
