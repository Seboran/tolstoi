// Netlify Edge Functions run on Deno (https://deno.land), so imports use URLs rather than package names.
import { Status } from 'https://deno.land/std@0.136.0/http/http_status.ts'
import type { Context } from 'https://edge.netlify.com'

export default async (request: Request, context: Context) => {
  // We obtain the value of the 'resource' query parameter so that we
  // can ensure a response is only sent for the identity we want.
  const url = new URL(request.url)
  const resourceParam = url.searchParams.get('resource')
  if (resourceParam === null) {
    return context.json(
      {
        error: "No 'resource' query parameter was provided",
      },
      {
        status: Status.BadRequest,
      },
    )
    // I want to be searchable as `@harsh@msfjarvis.dev`, so I only
    // allow requests that set the resource query param to this value.
  } else if (resourceParam !== 'acct:nirina@nirinarabeson.fr') {
    return context.json(
      {
        error: 'An invalid identity was requested',
      },
      {
        status: Status.BadRequest,
      },
    )
  } else {
    // Here's the JSON object we got earlier
    return context.json({
      subject: 'acct:nirina@hachyderm.io',
      aliases: [
        'https://hachyderm.io/@nirina',
        'https://hachyderm.io/users/nirina',
      ],
      links: [
        {
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
          href: 'https://hachyderm.io/@nirina',
        },
        {
          rel: 'self',
          type: 'application/activity+json',
          href: 'https://hachyderm.io/users/nirina',
        },
        {
          rel: 'http://ostatus.org/schema/1.0/subscribe',
          template: 'https://hachyderm.io/authorize_interaction?uri={uri}',
        },
        {
          rel: 'http://webfinger.net/rel/avatar',
          type: 'image/jpeg',
          href: 'https://media.hachyderm.io/accounts/avatars/111/000/057/154/911/388/original/6b7800b0f9f9b593.jpg',
        },
      ],
    })
  }
}
