
import React from 'react'
// import { fileURLToPath } from 'url'
import './styles.css'
import { getCurrentUser } from '@/lib/payload-auth'
import Link from 'next/link'

export default async function HomePage() {
  const user = await getCurrentUser()

  return (
    <div className="home">
      <div className="content">
        <img
          src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
          alt="Payload Logo"
          width={65}
          height={65}
        />

        {user ? (
          <h1>Welcome back, {user.email}</h1>
        ) : (
          <h1>Welcome to Payload CMS</h1>
        )}
        <Link href={'/admin'}>
          <button>
            Admin
          </button>
        </Link>
      </div>
    </div>
  )
}
