export const fetchRecentlyAdded = async ({
  devToken,
  musicUserToken
}: {
  devToken: string
  musicUserToken: string
}) => {
  return await fetch(
    'https://amp-api.music.apple.com/v1/me/library/recently-added?l=en-US&platform=web&extend=artistUrl&limit=25&art%5Bf%5D=url&include=catalog',
    {
      headers: {
        authorization: `Bearer ${devToken}`,
        'music-user-token': musicUserToken
      }
    }
  )
    .then(async response => {
      return await (response.json() as Promise<Response>)
    })
    .catch(e => {
      console.error(e)
      return e
    })
}
