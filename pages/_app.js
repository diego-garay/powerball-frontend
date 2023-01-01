import { ChakraProvider } from "@chakra-ui/react"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp
