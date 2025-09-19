import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import React, { use, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import ArrowRight from '../../assets/icons/ArrowRight';
import PauseIcon from '../../assets/icons/PauseIcon';
import GameIcon from '../../assets/icons/GameIcon';
import CrownIcon from '../../assets/icons/CrownIcon';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import SolvedPuzzleScreen from './SolvedPuzzleScreen';
import GameInstructionScreen from './GameInstructionScreen';
import LifelineIcon from '../../assets/icons/LifelineIcon';
import StarIcon from '../../assets/icons/StarIcon';
import GameWinScreen from './GameWinScreen';

type GuessedWordProps = {
  letter?: string;
};

function GuessedWord({ letter }: GuessedWordProps) {
  return (
    <View className="border-b-4 border-black w-10 justify-center items-center mx-1">
      <Text className="text-4xl font-llewie text-black">{letter || ''}</Text>
    </View>
  );
}

const GameScreen: React.FC = () => {
  const correctWord = 'Jesus';
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [puzzleWord, setPuzzleWord] = useState<string[]>([
    '_',
    'e',
    '_',
    '_',
    '_',
  ]);
  const [letter, setLetter] = useState('');
  const [pieces, setPieces] = useState(12);
  const [round, setRound] = useState(1);
  const [step, setStep] = useState(1);
  const [showRewardScreen, setShowRewardScreen] = useState(false);
  const [RewardScreenAnswer, setRewardScreenAnswer] = useState('');
  const [RewardScreenPoints, setRewardScreenPoints] = useState(0);
  const [showInstructionScreen, setShowInstructionScreen] = useState(false);
  const [instructionScreenAnswer, setInstructionScreenAnswer] = useState('');

  const timerDuration = 15; // total countdown in seconds
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const handleSubmit = () => {
    if (letter.trim() === '') return;

    const lowerCorrect = correctWord.toLowerCase();
    const guess = letter.toLowerCase();

    // ✅ If guessed wrong before, do nothing
    if (wrongGuesses.includes(guess)) {
      console.log('Already guessed this wrong letter!');
      setLetter('');
      return;
    }

    if (lowerCorrect.includes(guess)) {
      // find first unrevealed occurrence of this letter
      const firstHiddenIndex = lowerCorrect
        .split('')
        .findIndex((char, idx) => char === guess && puzzleWord[idx] === '_');

      if (firstHiddenIndex === -1) {
        console.log('All occurrences of this letter already revealed!');
        setLetter('');
        return;
      }

      // ✅ reveal only ONE occurrence
      const updatedPuzzle = [...puzzleWord];
      updatedPuzzle[firstHiddenIndex] = correctWord[firstHiddenIndex];

      setPuzzleWord(updatedPuzzle);
      console.log(
        `Correct guess! Revealed one '${guess}' at position ${firstHiddenIndex}`,
      );
      if (updatedPuzzle.join('') === correctWord) {
        setStep(2);
        setEarnedPoints(prev => prev + 15);
        handleShowReward();
      }
    } else {
      // wrong guess
      setPieces(prev => Math.max(prev - 1, 0));
      setWrongGuesses(prev => [...prev, guess]);
      console.log(`Wrong guess '${guess}'! Pieces left: ${pieces - 1}`);
    }

    setLetter('');
  };
  const handleSubmit2 = () => {
    if (letter.trim() === '') return;
    const lowerCorrect = correctWord.toLowerCase();
    const guess = letter.toLowerCase();

    if (true) {
      setStep(3);
      setEarnedPoints(prev => prev + 10);
      handleShowReward();
    } else {
      setPieces(prev => Math.max(prev - 1, 0));
    }
  };
  const handleShowInstruction = () => {
    setShowInstructionScreen(true); // ✅ Show reward screen
    setInstructionScreenAnswer(correctWord); // ✅ Display the correct word

    setTimeout(() => {
      setShowInstructionScreen(false);
    }, 3000);
  };
  const handleShowReward = () => {
    setShowRewardScreen(true); // ✅ Show reward screen
    setRewardScreenAnswer(correctWord); // ✅ Display the correct word
    setRewardScreenPoints(15); // ✅ Show points earned

    setTimeout(() => {
      setShowRewardScreen(false);
      handleShowInstruction();
    }, 3000);
  };

  return (
    <SafeAreaView edges={['top']} className="bg-white flex-1">
      {step === 1 && (
        <View className="bg-white flex-1">
          {/* Logo */}
          <View className="mb-6 items-center flex flex-row justify-center">
            <Logo
              color="#233066"
              height={responsiveScreenWidth(20)}
              width={responsiveScreenWidth(60)}
            />
            <PauseIcon width={28} height={28} />
          </View>
          <View className="justify-end items-end px-4">
            <CountdownCircleTimer
              isPlaying
              duration={timerDuration}
              colors={['#1A7EB2', '#1A7EB1', '#1A7EB2', '#1A7EB2']}
              colorsTime={[timerDuration, 10, 5, 0]}
              size={70}
              strokeWidth={10}
              rotation={'counterclockwise'}
              strokeLinecap={'square'}
            >
              {({ remainingTime }) => (
                <Text className="text-blueBorder font-llewie text-2xl">
                  {remainingTime}
                </Text>
              )}
            </CountdownCircleTimer>
          </View>

          {/* Puzzle word */}
          <View className="mx-4 flex-row justify-center mt-14 gap-8">
            {puzzleWord.map((char, index) => (
              <GuessedWord
                key={index}
                letter={char !== '_' ? char.toUpperCase() : ''}
              />
            ))}
          </View>

          {/* Input field */}
          <View className="mx-6 mt-14">
            <View className="border-4 h-[4.5rem] w-full border-highlight rounded-xl z-10 bg-white flex flex-row">
              <TextInput
                placeholder="Enter your answer"
                placeholderTextColor="#2330665C"
                value={letter}
                onChangeText={text => {
                  const onlyLetters = text.replace(/[^a-zA-Z]/g, '');
                  setLetter(onlyLetters.toUpperCase());
                }}
                maxLength={1}
                autoCapitalize="characters"
                className="bg-textLight py-4 w-[85%] px-4 rounded-lg font-llewie text-primary text-lg"
              />
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
                className="bg-secondary flex justify-center items-center rounded-r-lg w-[15%]"
              >
                <ArrowRight width={40} height={40} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="flex-row justify-between px-4 mt-10">
            <View>
              <GameIcon pieces={pieces} width={80} height={100} />
            </View>

            <View className="justify-center items-center gap-1">
              <Text className="font-llewie text-4xl text-primary">
                RD#{round}
              </Text>
              <View className="flex-row">
                <StarIcon width={24} height={24} fill={'#14AE5C'} />
                <StarIcon width={24} height={24} fill={'#F20000'} />
              </View>
              <View className="bg-secondary px-4 py-2 rounded-bl-xl rounded-tr-xl">
                <Text className="text-3xl font-llewie text-primary">
                  {earnedPoints} Pts
                </Text>
              </View>
            </View>

            <View className=" justify-end items-center">
              <LifelineIcon width={60} height={60} />
              <Text className="font-llewie text-xl text-black">Lifeline</Text>
            </View>
          </View>
        </View>
      )}

      {showRewardScreen && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999, // ensures it’s on top
          }}
        >
          <SolvedPuzzleScreen
            answer={RewardScreenAnswer}
            points={RewardScreenPoints}
          />
        </View>
      )}
      {(showInstructionScreen && round === 1) && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999, // ensures it’s on top
          }}
        >
          <GameInstructionScreen  />
        </View>
      )}
      {(showInstructionScreen && round === 2) && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999, // ensures it’s on top
          }}
        >
          <GameWinScreen  />
        </View>
      )}
      {step === 2 && (
        <View className="bg-white flex-1">
          {/* Logo */}
          <View className="mb-6 items-center flex flex-row justify-center">
            <Logo
              color="#233066"
              height={responsiveScreenWidth(20)}
              width={responsiveScreenWidth(60)}
            />
            {/* <PauseIcon width={28} height={28} /> */}
          </View>

          {/* Puzzle word */}
          <View className="mx-4 items-center justify-center mt-4 gap-8">
            <Text className="text-center font-llewie text-4xl text-black bottom-black border-b-2">
              Jesus
            </Text>
            <Text className="text-center font-llewie text-base text-black">
              “In all things I have shown you that by working hard in this way
              we must help the weak and remember the words of the Lord Jesus,
              how he himself said, ‘It is more blessed to give than to
              receive.’”
            </Text>
          </View>

          {/* Input field */}
          <View className="mx-6 mt-14">
            <View className="border-4  w-full  z-10  border-highlight rounded-xl bg-white flex">
              <TextInput
                placeholder="Enter your answer"
                placeholderTextColor="#2330665C"
                value={letter}
                onChangeText={text => {
                  // const onlyLetters = text.replace(/[^a-zA-Z]/g, '');
                  setLetter(text);
                }}
                multiline={true}
                numberOfLines={5}
                autoCapitalize="characters"
                className="bg-textLight py-4 w-[85%] px-4 h-16  font-llewie text-primary text-lg"
              />
            </View>
            <View className=" mt-6">
              <TouchableOpacity
                onPress={() => {
                  handleSubmit2();
                }}
                className="bg-secondary flex justify-center items-center rounded-lg w-full py-2"
              >
                <Text className="text-center font-llewie text-4xl text-black ">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="flex-row justify-between px-4 mt-10">
            <View>
              <GameIcon pieces={pieces} width={80} height={100} />
            </View>

            <View className="justify-center items-center gap-1">
              <Text className="font-llewie text-4xl text-primary">
                RD#{round}
              </Text>
              <View className="flex-row">
                <StarIcon width={24} height={24} fill={'#14AE5C'} />
                <StarIcon width={24} height={24} fill={'#F20000'} />
              </View>
              <View className="bg-secondary px-4 py-2 rounded-bl-xl rounded-tr-xl">
                <Text className="text-3xl font-llewie text-primary">
                  {earnedPoints} Pts
                </Text>
              </View>
            </View>

            <View className=" justify-center items-center">
              <LifelineIcon width={60} height={60} />
              <Text className="font-llewie text-xl text-black">Lifeline</Text>
            </View>
            <View className="justify-center items-center px-4">
              <CountdownCircleTimer
                isPlaying
                duration={timerDuration}
                colors={['#1A7EB2', '#1A7EB1', '#1A7EB2', '#1A7EB2']}
                colorsTime={[timerDuration, 10, 5, 0]}
                size={70}
                strokeWidth={10}
                rotation={'counterclockwise'}
                strokeLinecap={'square'}
              >
                {({ remainingTime }) => (
                  <Text className="text-blueBorder font-llewie text-2xl">
                    {remainingTime}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
          </View>
        </View>
      )}
      {step === 3 && (
        <View className="bg-white flex-1">
          {/* Logo */}
          <View className="mb-6 items-center flex flex-row justify-center">
            <Logo
              color="#233066"
              height={responsiveScreenWidth(20)}
              width={responsiveScreenWidth(60)}
            />
            {/* <PauseIcon width={28} height={28} /> */}
          </View>

          {/* Puzzle word */}
          <View className="mx-4 items-center justify-center mt-4 gap-8">
            <Text className="text-center font-llewie text-2xl text-black mx-8 ">
              Which Bible verse contains the says "He Cried"?
            </Text>
            <View className="w-full mx-28 gap-3">
              {['Acts 19:10', 'Acts 20:10', 'Acts 5:10', 'Acts 15:10'].map(
                (option, index) => {
                  const isSelected = letter === option;

                  return (
                    <Pressable
                      key={index}
                      onPress={() => setLetter(option)}
                      className={` rounded-xl `}
                    >
                      <Text
                        className={` font-llewie text-2xl 
                ${isSelected ? 'text-highlight' : 'text-black'}`}
                      >
                        {String.fromCharCode(65 + index)}) {option}
                      </Text>
                    </Pressable>
                  );
                },
              )}
            </View>
          </View>

          {/* Input field */}
          <View className="mx-6 mt-20">
            <View className=" mt-6">
              <TouchableOpacity
                onPress={() => {
                  handleShowReward()
                  setRound(2)
                  setStep(1)
                  setLetter("")
                  setPieces(12)
                }}
                className="bg-secondary flex justify-center items-center rounded-lg w-full py-2"
              >
                <Text className="text-center font-llewie text-4xl text-black ">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="flex-row justify-between px-4 mt-28">
            <View>
              <GameIcon pieces={pieces} width={80} height={100} />
            </View>

            <View className="justify-center items-center gap-1">
              <Text className="font-llewie text-4xl text-primary">
                RD#{round}
              </Text>
              <View className="flex-row">
                <StarIcon width={24} height={24} fill={'#14AE5C'} />
                <StarIcon width={24} height={24} fill={'#F20000'} />
              </View>
              <View className="bg-secondary px-4 py-2 rounded-bl-xl rounded-tr-xl">
                <Text className="text-3xl font-llewie text-primary">
                  {earnedPoints} Pts
                </Text>
              </View>
            </View>

            <View className=" justify-center items-center">
              <LifelineIcon width={60} height={60} />
              <Text className="font-llewie text-xl text-black">Lifeline</Text>
            </View>
            <View className="justify-center items-center px-4">
              <CountdownCircleTimer
                isPlaying
                duration={timerDuration}
                colors={['#1A7EB2', '#1A7EB1', '#1A7EB2', '#1A7EB2']}
                colorsTime={[timerDuration, 10, 5, 0]}
                size={70}
                strokeWidth={10}
                rotation={'counterclockwise'}
                strokeLinecap={'square'}
              >
                {({ remainingTime }) => (
                  <Text className="text-blueBorder font-llewie text-2xl">
                    {remainingTime}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default GameScreen;
