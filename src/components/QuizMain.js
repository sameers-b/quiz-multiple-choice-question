import React,{useState} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';

const Quiz = () => {
    //initiating the local states
    const [questions, setQuestions] = useState({
        1: 'What does HTML stand for?',
        2: 'Choose the correct HTML element for the largest heading:',
        3: 'Which character is used to indicate an end tag?',
    });
    const [answers, setAnswers] = useState({
        1: {
            1: 'Hyper Text markup Language',
            2: 'Hyperlinks and Text markup Language',
            3: 'Home Tool markup Language',
        },
        2: {
            1: '<head>',
            2: '<heading>',
            3: '<h1>',
        },
        3: {
            1: '<',
            2: '*',
            3: '/',
        },
    });
    const [correctAnswers, setCorrectAnswers] = useState({
        1: '1',
        2: '3',
        3: '3',
    });
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [clickedAnswer, setClickedAnswer] = useState(0);
    const [step, setStep] = useState(1);
    const [score, setScore] = useState(0);

    // the method that checks the correct answer
    const checkAnswer = answer => {
        if(answer === correctAnswers[step]){
            setScore(score+1)
            setCorrectAnswer(correctAnswers[step])
            setClickedAnswer(answer)
        }else{
            setCorrectAnswer(0);
            setClickedAnswer(answer);
        }
    }

    // method to move to the next question
    const nextStep = (step) => {
        setStep(step+1)
        setCorrectAnswer(0)
        setClickedAnswer(0);
    }

    return(
        <div className="Content">
            {step <= Object.keys(questions).length ? 
                (<>
                    <Question
                        question={questions[step]}
                    />
                    <Answer
                        answer={answers[step]}
                        step={step}
                        checkAnswer = {checkAnswer}
                        correctAnswer={correctAnswer}
                        clickedAnswer={clickedAnswer}
                     />
                    <button
                    className="NextStep"
                    disabled={
                        clickedAnswer && Object.keys(questions).length >= step
                        ? false : true
                    }
                    onClick={() => nextStep(step)}>Next</button>
                </>) : (
                    <div className="finalPage">
                        <h1>You have completed the quiz!</h1>
                        <p>Your score is: {score} of {Object.keys(questions).length}</p>
                        <p>Thank you!</p>
                    </div>
                )
            }
        </div>
    )
};
export default Quiz;

