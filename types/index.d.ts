import { Object as ParseObject, User, } from '@types/parse'
import { Attributes, }                  from 'react'

export type ParseObject = ParseObject

export type AppState = {
  isConnectWalletModalOpen: boolean
  isGiveJournoModalOpen: boolean
  shouldCheckIsUserLoggedIn: boolean
  isClaimingTokens: boolean
}

export type ParseUserJson = ParseObjectJson & {
  username: string
  email: string
}

export type ParseObjectJson = ParseObject & {
  objectId: string
}

export type TwitterUser = {
  name: string
  username: string
  profile_image_url: string
  description: string
  url: string
  id: string
}

export type TwitterAuth = {
  twitterUsername?: string
  twitterUserId?: string
}

