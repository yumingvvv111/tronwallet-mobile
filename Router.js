import React from 'react'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  SafeAreaView,
  createAppContainer
} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import createCustomTopTabNavigator from './src/components/Navigation/createCustomTopTabNavigator'

import { Colors, ScreenSize } from './src/components/DesignSystem'
import { TWIcon } from './src/components/Utils'

import Loading from './src/scenes/Loading'
import SendScene from './src/scenes/Send'
import Market from './src/scenes/Market'
import BalanceScene from './src/scenes/Balance'
import VoteScene from './src/scenes/Vote'
import ReceiveScene from './src/scenes/Receive'
import TransactionListScene from './src/scenes/Transactions'
import SubmitTransactionScene from './src/scenes/SubmitTransaction'
import FreezeScene from './src/scenes/Freeze'
import Settings from './src/scenes/Settings'
import About from './src/scenes/About'
import TokenInfoScene from './src/scenes/Participate/TokenInfo'
import BuyScene from './src/scenes/Participate/Buy'
import GetVaultScene from './src/scenes/GetVault'
import FreezeVoteScene from './src/components/Vote/Freeze'
import RewardsScene from './src/scenes/Rewards'
import NetworkConnection from './src/scenes/Settings/NetworkModal'
import SeedSave from './src/scenes/Seed/Save'
import SeedRestore from './src/scenes/Seed/Restore'
import SeedConfirm from './src/scenes/Seed/Confirm'
import TransactionDetails from './src/scenes/TransactionDetails'
import ParticipateHome from './src/scenes/Participate'
import Pin from './src/scenes/Pin'
import FirstTime from './src/scenes/FirstTime'
import TransactionSuccess from './src/scenes/TransactionSuccess'
import AccountsScene from './src/scenes/Accounts'
import ContactsScene from './src/scenes/Contacts'
import EditAddressBookItem from './src/scenes/EditAddressBookItem'
import AddContactScene from './src/scenes/Contacts/Add'
import NavigationHeader from './src/components/Navigation/Header'
import MakePayScene from './src/scenes/Payments/Make'
import PaymentsScene from './src/scenes/Payments'
import ScanPayScene from './src/scenes/Payments/Scan'
import CreateSeed from './src/scenes/Seed/Create'
import ImportWallet from './src/scenes/Seed/Import'
import PrivacyPolicy from './src/scenes/PrivacyPolicy'
import ContractPreview from './src/scenes/ContractPreview'
import TronWebview from './src/scenes/TronWebview'
import Notifications from './src/scenes/Notifications'
import Signals from './src/scenes/Signals'
import ExchangeList from './src/scenes/Exchange'
import ExchangeTransaction from './src/scenes/Exchange/Transaction'

import tl from './src/utils/i18n'

const defaultCardStyle = {
  shadowColor: 'transparent',
  backgroundColor: Colors.background
}

const SettingsStack = createStackNavigator({
  Settings,
  Market,
  About,
  SeedSave,
  SeedConfirm,
  NetworkConnection
}, {
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
  },
  cardStyle: defaultCardStyle
})

const tabWidth = ScreenSize.width / 2
const indicatorWidth = 15
const AddressBookTabs = createMaterialTopTabNavigator({
  Contacts: ContactsScene,
  Accounts: AccountsScene
}, {
  navigationOptions: {
    header: (
      <SafeAreaView style={{ backgroundColor: Colors.background }}>
        <NavigationHeader title={tl.t('addressBook.title')} />
      </SafeAreaView>
    ),
    gesturesEnabled: false
  },
  tabBarOptions: {
    activeTintColor: Colors.primaryText,
    inactiveTintColor: '#66688f',
    style: {
      paddingTop: 10,
      backgroundColor: Colors.background,
      elevation: 0
    },
    labelStyle: {
      fontSize: 12,
      lineHeight: 12,
      letterSpacing: 0.6,
      fontFamily: 'Rubik-Medium'
    },
    indicatorStyle: {
      width: indicatorWidth,
      height: 1.2,
      marginLeft: tabWidth / 2 - indicatorWidth / 2
    }
  }
})

const NotificationsTabs = createCustomTopTabNavigator({
  Notifications
}, {
  tabBarOptions: {
    header: {
      title: tl.t('notifications.title')
    }
  }
})

const AddressBookStack = createStackNavigator({
  AddressBook: AddressBookTabs,
  EditAddressBookItem,
  AddContact: AddContactScene
}, {
  mode: 'modal',
  cardStyle: defaultCardStyle
})

const BalanceStack = createStackNavigator({
  BalanceScene,
  ReceiveScene,
  FreezeScene,
  SendScene,
  PaymentsScene,
  MakePayScene,
  ScanPayScene,
  TokenDetailScene: TokenInfoScene,
  Signals
}, {
  mode: 'modal',
  cardStyle: defaultCardStyle
})

const ExchangeStack = createStackNavigator({
  ExchangeList,
  ExchangeTransaction
}, {
  mode: 'modal',
  cardStyle: defaultCardStyle
})

const TransactionList = createStackNavigator({
  TransactionListScene,
  TransactionDetails
}, {
  mode: 'modal',
  cardStyle: defaultCardStyle
})

const ParticipateStack = createStackNavigator({
  ParticipateHome,
  TokenInfo: TokenInfoScene,
  Buy: BuyScene
}, {
  mode: 'modal',
  cardStyle: defaultCardStyle
})

const AppTabs = createMaterialBottomTabNavigator({
  Exchange: ExchangeStack,
  Vote: {
    screen: VoteScene,
    path: 'vote'
  },
  AddressBook: AddressBookStack,
  Balance: BalanceStack,
  TronWebview,
  Transactions: TransactionList,
  Participate: ParticipateStack,
  Settings: SettingsStack
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state
      let iconName
      let iconSize = 25
      if (routeName === 'Balance') {
        iconName = `wallet,-money,-cash,-balance,-purse`
      } else if (routeName === 'Transfer') {
        iconName = `fly,-send,-paper,-submit,-plane`
      } else if (routeName === 'AddressBook') {
        iconName = `diary,-contact,-address,-organizer,-book`
      } else if (routeName === 'Vote') {
        iconName = `shout-out,-speaker,-offer,-announcement,-loud`
      } else if (routeName === 'Transactions') {
        iconName = `network,-arrow,-up-dowm,-mobile-data,-send-receive`
      } else if (routeName === 'Receive') {
        iconName = `scan,-bar-code,-qr-code,-barcode,-scanner`
      } else if (routeName === 'Settings') {
        iconName = `menu`
        iconSize = 23
      } else if (routeName === 'Participate') {
        iconName = `dollar,-currency,-money,-cash,-coin`
      } else if (routeName === 'Exchange') {
        iconName = 'exchange'
        iconSize = 22
      } else if (routeName === 'TronWebview') {
        iconName = `earth,-globe,-planet,-world,-universe`
        iconSize = 22
      }

      return (<TWIcon name={iconName} size={iconSize} color={tintColor} />)
    }
  }),
  labeled: false,
  activeTintColor: Colors.primaryText,
  inactiveTintColor: Colors.secondaryText,
  barStyle: {
    backgroundColor: 'black'
  },
  showLabel: false,
  animationEnabled: true,
  initialRouteName: 'Balance'
})

const FirstTimeSwitch = createSwitchNavigator({
  PrivacyPolicy,
  First: FirstTime
}, { initialRouteName: 'PrivacyPolicy' })

const RootNavigator = createStackNavigator({
  Loading,
  FirstTime: FirstTimeSwitch,
  Pin,
  CreateSeed,
  SeedRestore,
  ImportWallet,
  ContractPreview,
  App: AppTabs,
  GetVault: GetVaultScene,
  SubmitTransaction: {
    screen: SubmitTransactionScene,
    path: 'transaction/:tx'
  },
  TransactionSuccess,
  Freeze: FreezeVoteScene,
  Rewards: RewardsScene,
  NotificationsTabs
}, {
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
    header: null
  },
  cardStyle: defaultCardStyle
})

export default createAppContainer(RootNavigator)
