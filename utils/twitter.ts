import { useCallback, useEffect, useState, }      from 'react'
import { ParseObject, TwitterUser, TwitterAuth, } from '../types'
import ParseClient                                from './parseClient'
import { useIsMounted, }                          from './index'

type UseTwitterUserReturnProps = {
  isLoading: boolean
  twitterUser: TwitterUser | null
  getTwitterUser: (twitterUserId: string) => Promise<TwitterUser | null>
}

export const useTwitterUser = (twitterUserId?: string,): UseTwitterUserReturnProps => {
  const [ isLoading, setIsLoading, ] = useState(false,)
  const [ twitterUser, setTwitterUser, ] = useState<TwitterUser | null>(null,)

  const getTwitterUser = useCallback(async (localTwitterUserId: string,) => {
    setIsLoading(true,)

    const response = await fetch('/api/query', {
      method  : 'POST',
      headers : {
        'Content-Type' : 'application-json',
      },
      body : JSON.stringify({
        twitterUserId : localTwitterUserId,
      },),
    },)

    const json = await response.json()

    if ( response ) {
      setTwitterUser(json as TwitterUser,)
    }

    setIsLoading(false,)

    if (!response) {
      return null
    }

    return json as TwitterUser
  }, [ twitterUserId, ],)

  useEffect(() => {
    if (twitterUserId) {
      getTwitterUser(twitterUserId,)
    }

  }, [ twitterUserId, ],)

  return {
    isLoading,
    twitterUser,
    getTwitterUser,
  }
}

export const getTwitterAuth = async (): Promise<TwitterAuth | null> => {
  const response = await fetch('/api/twitter-auth', {
    method  : 'POST',
    headers : {
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify({
      state         : window.localStorage.getItem('twitter-state',),
      codeVerifier  : window.localStorage.getItem('twitter-codeVerifier',),
      codeChallenge : window.localStorage.getItem('twitter-codeChallenge',),
    },),
  },).catch(( err, ) => {
    console.log(JSON.stringify(err,),)
  },)

  if ( response ) {
    const json = await response.json()
    return json
  }

  return null
}

type UseTwitterAuthReturnProps = {
  isLoading: boolean
  twitterAuthParse: ParseObject | null
  twitterAuthJson: TwitterAuth | null
  twitterAuthError: string | null
  twitterUsername: string | null
  twitterUserId: string | null
  getTwitterAuth: () => Promise<ParseObject | null>
}

export const useTwitterAuth = (): UseTwitterAuthReturnProps => {
  const [ isLoading, setIsLoading, ] = useState(false,)
  const [ twitterAuthParse, setTwitterAuthParse, ] = useState<ParseObject | null>(null,)
  const [ twitterAuthJson, setTwitterAuthJson, ] = useState<TwitterAuth | null>(null,)
  const [ twitterAuthError, setTwitterAuthError, ] = useState<string | null>(null,)
  const [ twitterUsername, setTwitterUsername, ] = useState<string | null>(null,)
  const [ twitterUserId, setTwitterUserId, ] = useState<string | null>(null,)

  const [ twitterAuthSubscription, setTwitterAuthSubscription, ] = useState<ParseClient.LiveQuerySubscription | null>(null,)

  const { state, codeVerifier, codeChallenge, } = useLocalTwitterAuthData()

  const { isMounted, } = useIsMounted()

  const _getAuthFromLocalData = useCallback(async (): Promise<void> => {
    const response = await fetch('/api/twitter-auth', {
      method  : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        state,
        codeVerifier,
        codeChallenge,
      },),
    },).catch(( err, ) => {
      setTwitterAuthError(JSON.stringify(err,),)
    },)

    if ( response ) {
      const json = await response.json()
      setTwitterUsername(json.twitterUsername,)
      setTwitterUserId(json.twitterUserId,)
    }
  }, [ state, codeVerifier, codeChallenge, twitterUsername, ],)

  const getTwitterAuth = useCallback(async (): Promise<ParseObject | null> => {
    setIsLoading(true,)

    if ( !isMounted ) {
      return null
    }

    if ( ParseClient.User.current() ) {
      const queryTwitterAuth = new ParseClient.Query('TwitterAuth',)
      queryTwitterAuth.equalTo('user', ParseClient.User.current(),)
      const fetchedAuth = await queryTwitterAuth.first()
      if ( fetchedAuth ) {
        setTwitterAuthParse(fetchedAuth,)
      }

      if (!fetchedAuth && state && codeVerifier && codeChallenge) {
        const { twitterAuthId, } = await ParseClient.Cloud.run('linkUserToTwitterAuth', {
          state,
          codeVerifier,
          codeChallenge,
        },).catch((err,) => {
          console.log(err,)
          setTwitterAuthError(JSON.stringify(err,),)
        },)

        if (twitterAuthId) {
          const queryTwitterAuth = new ParseClient.Query('TwitterAuth',)
          queryTwitterAuth.equalTo('user', ParseClient.User.current(),)
          const twitterAuth = await queryTwitterAuth.get(twitterAuthId,)

          if (twitterAuth) {
            setTwitterAuthParse(twitterAuth,)
          }
        }
      }

    }

    setIsLoading(false,)

    return null
  }, [ state, codeVerifier, codeChallenge, twitterAuthParse, isLoading, twitterUsername, ],)

  useEffect(() => {
    if ( state && codeVerifier && codeChallenge && ParseClient.User.current() && !twitterAuthParse ) {
      getTwitterAuth()
    }
  }, [ state, codeVerifier, codeChallenge, ],)

  useEffect(() => {
    if (state && codeVerifier && codeChallenge && !twitterUsername && !ParseClient.User.current()) {
      _getAuthFromLocalData()
    }
  }, [ state, codeVerifier, codeChallenge, ],)

  useEffect(() => {

    getTwitterAuth()

    return () => {
      if ( twitterAuthSubscription ) {
        twitterAuthSubscription.unsubscribe()
      }
    }

  }, [],)

  return {
    isLoading,
    twitterAuthParse,
    twitterAuthJson,
    getTwitterAuth,
    twitterAuthError,
    twitterUsername,
    twitterUserId,
  }
}


export const useLocalTwitterAuthData = () => {

  const [ state, setState, ] = useState<string | null>(null,)
  const [ codeVerifier, setCodeVerifier, ] = useState<string | null>(null,)
  const [ codeChallenge, setCodeChallenge, ] = useState<string | null>(null,)

  const { isMounted, } = useIsMounted()

  const check = useCallback(() => {
    if (isMounted) {
      setState(window.localStorage.getItem('twitter-state',) || null,)
      setCodeVerifier(window.localStorage.getItem('twitter-codeVerifier',) || null,)
      setCodeChallenge(window.localStorage.getItem('twitter-codeChallenge',) || null,)
    }
  }, [],)

  useEffect(() => {
    check()
  }, [],)

  return {
    state,
    codeVerifier,
    codeChallenge,
    check,
  }


}
