"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Heart} from "lucide-react";

export default function Game() {

    const [lives, setLives] = useState(0)
    const [score, setScore] = useState(0)
    const [guessNumber, setGuessNumber] = useState(0)
    const [lastNumbers, setLastNumbers] = useState([])
    const [guessMessage, setGuessMessage] = useState('')
    const [playGame, setPlayGame] = useState(false)

    function startGame() {
        setLives(5)
        setScore(0)
        setGuessNumber(Math.floor(Math.random() * 100))
        setLastNumbers([])
        setGuessMessage('')
        setPlayGame(true)
    }
    function guess(event) {
        event.preventDefault()
        let number = event.target.elements.addNr.value
        event.target.elements.addNr.value = ""

        // daca e corect

        if(!playGame) return

       if(! Number(number)) {
           return
       }

        if(number > 100) {
            return setGuessMessage('You can not enter a number higher than 100')
        }

        if(number < 0) {
            return setGuessMessage('You can not enter a number smaller than 0')
        }

        if(Number(number) === guessNumber) {
            return finishGame('win')
        }

        if(Number(number) > guessNumber) {
            setGuessMessage('The number is too high!')
        }

        else {
            setGuessMessage('The number is too low!')
            setLastNumbers((prevState) =>  [...prevState, number])
        }
        setLives(lives - 1)
    }
    function finishGame(type) {
        if(type === 'win') {
            setScore(20)
            setGuessMessage("Congratulations, you guess the number! The number was " + guessNumber)
        }
        else if(type === 'lose') {
            setGuessMessage("You didn't guess the number.")
        }
        setPlayGame(false)

    }

    useEffect(() => {
        if(lives < 1) return finishGame('lose')
    }, [lives])
    useEffect(() => {
        startGame()
    }, [])

    return  <div className="flex flex-col h-screen items-center justify-center bg-black ">
        <div className="font-retrolight text-[#ff4fdb] text-center  sm:text-[90px] text-[60px]">GUESS GAME</div>
        <Card className="lg:w-[750px] md:w-[700px] sm:w-[600px] w-full border-[#ff4fdb]">
            <CardHeader className="bg-[#ff4fdb] text-center">
                {(lastNumbers.length > 0 && score === 0) &&
                    <>
                        <div className="text-white text-sm">
                            <span>Your last attempts: </span>
                            {lastNumbers?.map((lastNumber, index) => <span key={index}>{lastNumber} </span>)}
                        </div>
                        <h1 className="text-white font-retrolight text-[40px] !m-0">{playGame ? "Try again" : "Game over"}</h1>
                    </>
                }
                {score > 0 &&  <h1 className="text-white font-retrolight text-[40px] !m-0">You Win</h1>}
                <div className="text-white text-sm !m-0">{guessMessage}</div>
            </CardHeader>
            <CardContent className="bg-slate-950">
                <div className="flex justify-between text-white p-5">
                    <p className="flex items-center">
                        Lives:
                        {Array.from({length: lives}).map((e, i) => {
                            return <Heart key={i} className="mx-1" size={20} />
                        })}
                    </p>
                    <p>Score: {score}</p>
                </div>
                <div className="text-white text-sm text-center p-5">Enter a number between 0 and 100.</div>
                <form onSubmit={guess} className="flex flex-col items-center">
                    <div className="flex flex-col justify-center items-center !m-0">
                        <Input name="addNr" className="border-[#ff4fdb]" type="number"/>
                    </div>
                    <div className="flex justify-center items-center p-5">
                        <Button className="h-100 w-40 py-2 text-2xl text-[#ff4fdb] border-[#ff4fdb] border-4"
                                type="submit">Guess</Button>
                    </div>
                </form>
                <div className="flex justify-center p-5">
                    <Button onClick={startGame}  className="h-100 py-3 px-5 text-[#ff4fdb] border-[#ff4fdb] border-4">Start Game</Button>
                </div>
            </CardContent>
        </Card>
    </div>

}