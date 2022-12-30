import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useMoralis } from "react-moralis"

// Top navbar
export default function Header() {
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } =
        useMoralis()

    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    return (
        <Box as="nav" p={5} borderBottomWidth={2}>
            <Flex align="center">
                <Text fontSize="2xl" fontWeight="bold" fontFamily="sans-serif">
                    Decentralized Powerball Lottery
                </Text>
                {account ? (
                    <Box as={Button} variantColor="blue" ml="auto" py={2} px={4}>
                        {account.slice(0, 6)}...{account.slice(account.length - 4)}
                    </Box>
                ) : (
                    <Button
                        onClick={async () => {
                            const ret = await enableWeb3()
                            if (typeof ret !== "undefined") {
                                if (typeof window !== "undefined") {
                                    window.localStorage.setItem("connected", "injected")
                                }
                            }
                        }}
                        isDisabled={isWeb3EnableLoading}
                        variantColor="blue"
                        ml="auto"
                        py={2}
                        px={4}
                    >
                        Connect
                    </Button>
                )}
            </Flex>
        </Box>
    )
}
