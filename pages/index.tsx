import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from '../styles/Home.module.css'
import Listaproyectos from '../components/Listaproyectos'
import Formnuevoproyecto from '../components/Formnuevoproyecto'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (session) {
    return (
      <>
        SESSION
        {console.log(session)}
        <div> {session.user?.email}</div>
        <button type="button" onClick={() => signOut()}>
          OUT
        </button>
        <Listaproyectos />
      </>
    )
  }

  return (
    <div className={styles.container}>
      No session
      <button type="button" onClick={() => signIn()}>
        Click
      </button>
      
    </div>
  )
}

export default Home
