import React from 'react'
import styles from './NotFound.module.css'

interface ErrorProps {
  message: string
}
const NotFound: React.FC = () => {
  return (
    <article>
      <section>
        <header className={styles.header}>
          <h1> Page not found</h1>
        </header>
        <main className={styles.body}>
          <span>We have looked all around but haven&apos;t found what you&apos;ve been looking for.</span>
        </main>
      </section>
    </article>
  )
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <article>
      <section>
        <header className={styles.header}>
          <h1>Unfortunate things happen. Server responded with an error</h1>
        </header>
        <main className={styles.body}>
          <span>{message}</span>
        </main>
      </section>
    </article>
  )
}
export { NotFound, Error }
