import React, { FunctionComponent, useCallback, useEffect, useState, } from 'react'
import { FaSpinner, }                                                  from 'react-icons/fa'
import Button                                                          from './Button'
import { useIsMounted, }                                               from '../utils'
import { useTwitterAuth, }                                             from '../utils/twitter'
import { IOAuth2RequestTokenResult, }                                  from 'twitter-api-v2'
import ParseClient, { TwitterAuth, }                                   from '../utils/parseClient'
import { LiveQuerySubscription, }                                      from 'parse'

type Props = {
  twitterAuthLink: {
    oauth_token: string
    oauth_token_secret: string
    oauth_callback_confirmed: 'true'
    url: string
  }
}

const LoginWithTwitter: FunctionComponent<Props> = ({ twitterAuthLink, },) => {

  const [ isLoggingIn, setIsLoggingIn, ] = useState(false,)
  const [ isAuthorizingTwitter, setIsAuthorizingTwitter, ] = useState(false,)
  const [ twitterAuthError, setTwitterAuthError, ] = useState<string | null>(null,)
  const [ twitterAuthSubscription, setTwitterAuthSubscription, ] = useState<LiveQuerySubscription | null>(null,)

  const { isMounted, } = useIsMounted()

  const { isLoading, twitterAuthParse, twitterUsername, } = useTwitterAuth()

  const isValidTwitterAuth = useCallback(() => {
    if ( twitterAuthParse && twitterAuthParse.get('accessToken',) ) {
      return true
    }

    return false
  }, [ twitterAuthParse, ],)

  const handleConnectTwitterClick = () => {

    const _auth = async (): Promise<void> => {

      if ( isMounted ) {
        window.localStorage.setItem('twitter-oauth_token', twitterAuthLink.oauth_token,)
        window.localStorage.setItem('twitter-oauth_token_secret', twitterAuthLink.oauth_token_secret,)
        window.localStorage.setItem('twitter-oauth_callback_confirmed', twitterAuthLink.oauth_callback_confirmed,)
      }

      if ( !ParseClient.User.current() ) {
        setIsAuthorizingTwitter(true,)
        setTwitterAuthError(null,)
        const response = await fetch('/api/twitter-auth', {
          method  : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            oauth_token              : twitterAuthLink.oauth_token,
            oauth_token_secret       : twitterAuthLink.oauth_token_secret,
            oauth_callback_confirmed : twitterAuthLink.oauth_callback_confirmed,
          },),
        },).catch(( err, ) => {
          setTwitterAuthError(JSON.stringify(err,),)
        },)

        if ( !response ) {
          setTwitterAuthError('Error authorizing Twitter',)
          setIsAuthorizingTwitter(false,)
          return
        }

        const json = await response.json()

        console.log(json,)

        setIsAuthorizingTwitter(false,)

      }

      if ( isMounted ) {
        const url = new URL(twitterAuthLink.url,)
        window.location.href = url
      }

    }

    _auth()

  }

  // On mount
  useEffect(() => {
    return () => {
      if (twitterAuthSubscription) {
        twitterAuthSubscription.unsubscribe()
      }
    }
  }, [],)

  return (
    <Button
      onClick={handleConnectTwitterClick}
    >
      {
        !isAuthorizingTwitter && (
          <span>Connect Twitter</span>
        )
      }
      {
        isAuthorizingTwitter && (
          <FaSpinner className={'fa-spin'} />
        )
      }
    </Button>
  )
}

export default LoginWithTwitter
