import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [smallBlind, setSmallBlind] = React.useState(100)
  const value = {smallBlind, setSmallBlind}
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          ハンドヒストリー記録アプリへ
        </h1>

        <div>
            <Link href="/record/blind">
              <h3>ハンドヒストリーを記録する &rarr;</h3>
            </Link>
        </div>
      </main>
    </div>
  )
}