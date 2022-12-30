import Head from "next/head"
import Header from "../components/Header"
import Entrance from "../components/Entrance"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Decentralized Powerball</title>
                <meta
                    name="description"
                    content="A decentralized and automated powerball lottery"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
        </div>
    )
}
