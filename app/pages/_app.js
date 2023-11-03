import Head from 'next/head'
import '../styles/global.css'
import dynamic from 'next/dynamic';
import '@solana/wallet-adapter-react-ui/styles.css'

const WalletConnectProviderDynamic = dynamic(
    () => import('../components/WalletConnectProvider').then((mod) => mod.WalletConnectProvider),
    { ssr: false }
  );

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Todo App</title>
            </Head>
            <main>
                <WalletConnectProviderDynamic>
                    <Component {...pageProps} />
                </WalletConnectProviderDynamic>
            </main>
        </>
    )
}

export default MyApp