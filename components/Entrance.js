import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import {
    Box,
    Button,
    Skeleton,
    Flex,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react"

export default function Entrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const powerballAddr = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [ticketPrice, setTicketPrice] = useState("0")
    const [totalPlayers, setTotalPlayers] = useState("0")
    const [recentWinners, setRecentWinners] = useState("0")
    const [number1, setNumber1] = useState("0")
    const [number2, setNumber2] = useState("0")
    const [number3, setNumber3] = useState("0")
    const [number4, setNumber4] = useState("0")
    const [number5, setNumber5] = useState("0")

    const dispatch = useNotification()

    const { runContractFunction: enterGame } = useWeb3Contract({
        abi: abi,
        contractAddress: powerballAddr,
        functionName: "enterGame",
        params: {
            numberOne: number1,
            numberTwo: number2,
            numberThree: number3,
            numberFour: number4,
            numberFive: number5,
        },
        msgValue: ticketPrice,
    })

    const { runContractFunction: getTicketPrice } = useWeb3Contract({
        abi: abi,
        contractAddress: powerballAddr,
        functionName: "getTicketPrice",
        params: {},
    })

    const { runContractFunction: getRecentWinners } = useWeb3Contract({
        abi: abi,
        contractAddress: powerballAddr,
        functionName: "getRecentWinners",
        params: {},
    })

    const { runContractFunction: getTotalPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: powerballAddr,
        functionName: "getTotalPlayers",
        params: {},
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        await enterGame({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error),
        })
    }

    async function updateUI() {
        const price = (await getTicketPrice()).toString()
        const totalPlrs = (await getTotalPlayers()).toString()
        const winners = (await getRecentWinners()).toString()
        setTicketPrice(price)
        setTotalPlayers(totalPlrs)

        if (winners.length == 0) {
            setRecentWinners("None")
        } else {
            setRecentWinners(winners)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "Tx Notification",
            position: "topR",
        })
    }

    return powerballAddr ? (
        <Box>
            <Flex justifyContent="center" alignItems="center">
                <Box
                    align="center"
                    textAlign="center"
                    fontSize="xl"
                    marginTop="8px"
                    marginBottom="8px"
                >
                    Ticket price: {ethers.utils.formatUnits(ticketPrice, "ether")} ETH
                </Box>
            </Flex>
            <Box align="center" textAlign="center" fontSize="xl">
                Total players: {totalPlayers}
            </Box>
            <Box align="center" textAlign="center" fontSize="xl">
                Recent winner(s): {recentWinners}
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={!number1}>
                    <FormLabel htmlFor="number1">Number 1</FormLabel>
                    <Input
                        type="number"
                        id="number1"
                        value={number1}
                        onChange={(event) => setNumber1(event.target.value)}
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!number2}>
                    <FormLabel htmlFor="number2">Number 2</FormLabel>
                    <Input
                        type="number"
                        id="number2"
                        value={number2}
                        onChange={(event) => setNumber2(event.target.value)}
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!number3}>
                    <FormLabel htmlFor="number3">Number 3</FormLabel>
                    <Input
                        type="number"
                        id="number3"
                        value={number3}
                        onChange={(event) => setNumber3(event.target.value)}
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!number4}>
                    <FormLabel htmlFor="number4">Number 4</FormLabel>
                    <Input
                        type="number"
                        id="number4"
                        value={number4}
                        onChange={(event) => setNumber4(event.target.value)}
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!number5}>
                    <FormLabel htmlFor="number5">Number 5</FormLabel>
                    <Input
                        type="number"
                        id="number5"
                        value={number5}
                        onChange={(event) => setNumber5(event.target.value)}
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                <Flex
                    marginTop="8px"
                    marginBottom="8px"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        type="submit"
                        disabled={!number1 || !number2 || !number3 || !number4 || !number5}
                    >
                        Play
                    </Button>
                </Flex>
            </form>
        </Box>
    ) : (
        <Box>
            <Flex justifyContent="center" alignItems="center">
                <Box
                    align="center"
                    textAlign="center"
                    fontSize="2xl"
                    marginTop="8px"
                    marginBottom="8px"
                >
                    Please connect to the correct network!
                </Box>
            </Flex>
        </Box>
    )
}
