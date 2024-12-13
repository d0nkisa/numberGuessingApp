// import { useState } from 'react';
// import { ArrowRight } from 'lucide-react';

// const GuessTheNumber = () => {
//   const [guess, setGuess] = useState('');
//   const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);
//   const [attemptsLeft, setAttemptsLeft] = useState(3);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = () => {
//     if (attemptsLeft > 1) {
//       if (parseInt(guess) === targetNumber) {
//         setSuccess(true);
//       } else {
//         setAttemptsLeft(attemptsLeft - 1);
//         setMessage(`Incorrect! You have ${attemptsLeft - 1} attempts left.`);
//       }
//     } else {
//       setMessage('No attempts left! Better luck next time.');
//       setAttemptsLeft(0);
//     }
//     setGuess('');
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       {success ? (
//         <div className="text-center text-green-700">
//           <h1 className="text-5xl font-bold">Congratulations!</h1>
//           <p className="text-2xl mt-4">You guessed the right number! 🎉</p>
//           <span className="text-6xl">🎊</span>
//         </div>
//       ) : (
//         <div className="max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
//           <h1 className="text-3xl font-bold mb-4">Guess the Number!</h1>
//           <p className="flex flex-wrap mb-6 text-gray-700">There is a number to be guessed(between 0 and 100). You have 3 attempts to guess it correctly.</p>
//           <div className="flex items-center justify-center space-x-2">
//             <input
//               type="number"
//               value={guess}
//               onChange={(e) => setGuess(e.target.value)}
//               className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your guess"
//             />
//             <ArrowRight className="w-auto h-auto ml-2 bg-green-500 rounded-lg px-4 py-2 hover:bg-green-600" onClick={handleSubmit}/>
//           </div>
//           {message && <p className="mt-4 text-red-600 font-semibold">{message}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GuessTheNumber;
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ref, push } from 'firebase/database';
import database from './firebase';

const GuessTheNumber = () => {
  const [guess, setGuess] = useState('');
  const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const logGuessToFirebase = (guess: string, status: string) => {
    const guessesRef = ref(database, 'guesses');
    push(guessesRef, {
      guess: parseInt(guess),
      status,
      timestamp: Date.now(),
    });
  };
  console.log(targetNumber)
  const handleSubmit = () => {
    if (!guess) {
      setMessage('Please enter a valid number.');
      return;
    }

    if (attemptsLeft > 1) {
      if (parseInt(guess) === targetNumber) {
        setSuccess(true);
        logGuessToFirebase(guess, 'correct');
      } else {
        setAttemptsLeft(attemptsLeft - 1);
        setMessage(`Incorrect! You have ${attemptsLeft - 1} attempts left.`);
        logGuessToFirebase(guess, 'incorrect');
      }
    } else {
      setMessage('No attempts left! Better luck next time.');
      setAttemptsLeft(0);
      logGuessToFirebase(guess, 'incorrect');
    }
    setGuess('');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {success ? (
        <div className="text-center text-green-700">
          <h1 className="text-5xl font-bold">Congratulations!</h1>
          <p className="text-2xl mt-4">You guessed the right number! 🎉</p>
          <span className="text-6xl">🎊</span>
        </div>
      ) : (
        <div className="max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Guess the Number!</h1>
          <p className="mb-6 text-gray-700">
            There is a number to be guessed (between 0 and 100). You have 3 attempts to guess it correctly.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your guess"
            />
            <ArrowRight
              className="w-auto h-auto ml-2 bg-green-500 rounded-lg px-4 py-2 hover:bg-green-600 cursor-pointer"
              onClick={handleSubmit}
            />
          </div>
          {message && <p className="mt-4 text-red-600 font-semibold">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default GuessTheNumber;
