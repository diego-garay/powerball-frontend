import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Decentralized Powerball</title>
                <meta name="description" content="A decentralized and automated powerball lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    )
}