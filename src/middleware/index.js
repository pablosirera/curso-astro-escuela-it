import { sequence } from 'astro:middleware'

import { auth } from './auth'
import { redirections } from './redirections'

export const onRequest = sequence(auth, redirections)