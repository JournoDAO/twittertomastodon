import React, { FunctionComponent, useCallback, useState, } from 'react'
import { FaSpinner, }                                       from 'react-icons/fa'
import Button                                               from './Button'
import { useIsMounted, }                                    from '../utils'
import { useTwitterAuth, }                                  from '../utils/twitter'
import { IOAuth2RequestTokenResult, }                       from 'twitter-api-v2'
import ParseClient, { TwitterAuth, }                        from '../utils/parseClient'

type Props = {
  twitterAuthLink: IOAuth2RequestTokenResult
}

const LoginWithTwitter: FunctionComponent<Props> = ({ twitterAuthLink, },) => {

  const [ isLoggingIn, setIsLoggingIn, ] = useState(false,)
  const [ isAuthorizingTwitter, setIsAuthorizingTwitter, ] = useState(false,)
  const [ twitterAuthError, setTwitterAuthError, ] = useState<string | null>(null,)

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
        window.localStorage.setItem('twitter-state', twitterAuthLink.state,)
        window.localStorage.setItem('twitter-codeVerifier', twitterAuthLink.codeVerifier,)
        window.localStorage.setItem('twitter-codeChallenge', twitterAuthLink.codeChallenge,)
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
            state         : twitterAuthLink.state,
            codeVerifier  : twitterAuthLink.codeVerifier,
            codeChallenge : twitterAuthLink.codeChallenge,
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

      if ( ParseClient.User.current() ) {
        const twitterAuth = new TwitterAuth({
          status        : 'created',
          state         : twitterAuthLink.state,
          codeVerifier  : twitterAuthLink.codeVerifier,
          codeChallenge : twitterAuthLink.codeChallenge,
          user          : ParseClient.User.current(),
        },)

        await twitterAuth.save()

      }


      if ( isMounted ) {
        const url = new URL(twitterAuthLink.url,)
        window.open(url,)
      }

    }

    _auth()

  }

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
