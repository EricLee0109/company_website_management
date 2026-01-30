import 'server-only'
import { headers } from 'next/headers'
import { getPayload, type TypedUser } from 'payload'
import config from '@/payload.config'

export async function getCurrentUser(): Promise<TypedUser | null> {
    const payload = await getPayload({ config })

    const result = await payload.auth({ headers: await headers() })

    return result.user ?? null
}
