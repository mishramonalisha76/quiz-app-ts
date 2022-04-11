import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//components
import QuestionCard from './components/questionCard/questionCard';
//types
import { Question_state,Difficulty} from './coreTypes';
import { AnswerObject } from './coreTypes';


const Total_questions = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question_state[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    console.log("in here")
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      Total_questions,
      Difficulty.EASY,
    )
    console.log(newQuestions)
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore(prev => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,

      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === Total_questions) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion);
    }
  }
  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === Total_questions ?
        (<button className='start' onClick={startTrivia}>Start</button>)
        : null}
      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading && <p > Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={Total_questions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />)}
      {!loading &&
        !gameOver &&
        userAnswers.length === number + 1 &&
        number !== Total_questions - 1 ? (
        <button className='next' onClick={nextQuestion}> Next Question</button>) : null}
    </div>
  );
}

export default App;
