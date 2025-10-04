import React, { useState } from 'react'
import QuestionList from './QuestionList'
import QuizCSS from './quiz.css'

export default function Quiz(){
    const questions = [
        {
            question : "What is React ? ",
            options: ["CSS Framework","React Library","React Framework","Testing tool"],
            answer: "React Library"
        },
        {
            question: "Which language is used for web apps?",
            options: ["Python", "JavaScript", "C++", "Java"],
            answer: "JavaScript"
        },
        {
            question : "Which language is used for styling web pages?",
            options: ["HTML","JQuery","CSS","XML"],
            answer: "CSS"
        },
        {
            question: "What does API stands for ? ",
            options: ["Application Programming Interface",
                    "Applied Programming Internet",
                    "Application Protocol Internet",
                    "Advanced Programming Interface"],
            answer: "Application Programming Interface"
        },
        {
            question: "HTML stands for?",
            options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tabular Markup Language",
            "None of the above"],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which tag is used to create a hyperlink in HTML?",
            options: ["<a>", "<link>", "<href>", "<hyperlink>"],
            answer: "<a>"
        },
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
            answer: "Cascading Style Sheets"
        },
        {
            question: "Which CSS property is used to change the text color?",
            options: ["font-style", "color", "text-color", "font-color"],
            answer: "color"
        },
         {
            question: "Which JavaScript method is used to select an element by ID?",
            options: ["getElementByClass()", "getElementById()", "querySelectorAll()", "getElementsByTagName()"],
            answer: "getElementById()"
        },
        {
            question: "Which attribute is used to define inline styles in HTML?",
            options: ["style", "class", "id", "css"],
            answer: "style"
        },
    ]

    const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
    const [currentAnswer , setCurrentAnswer] = useState(null);
    const [score, setScore]= useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    // Handle answer click
    const handleClick= (option) =>{
        setCurrentAnswer(option)
        if(option === questions[currentQuestionIndex].answer){
            setScore(score+1)
        }
    }
    
    // Next question handler
    const handleNextQuestion = ()=>{
        if(currentQuestionIndex + 1 < questions.length){
            setCurrentQuestionIndex(currentQuestionIndex +1);
            setCurrentAnswer(null);
        } else {
            setQuizFinished(true);
        }
    }

    // Restart quiz handler
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setCurrentAnswer(null);
        setScore(0);
        setQuizFinished(false);
    }

    // Progress bar width
    const progressWidth = ((currentQuestionIndex+1)/questions.length)*100;

    // Progress bar color when finished
    let progressClass = "";
    if(quizFinished){
        const percent = (score / questions.length) * 100;
        if(percent >= 70) progressClass = "good";      // green
        else if(percent >= 40) progressClass = "medium"; // yellow
        else progressClass = "bad";                    // red
    }

    return (
        <div className="quiz-container">
            {/* Progress Bar */}
            {!quizFinished && (
                <div className="progress-bar">
                    <div 
                        className={`progress ${progressClass}`} 
                        style={{ width: `${progressWidth}%` }}
                    ></div>
                </div>
            )}

            {!quizFinished ? (
                <div>
                    <QuestionList 
                        question={questions[currentQuestionIndex].question} 
                        options={questions[currentQuestionIndex].options} 
                        handleClick={handleClick} 
                        currentAnswer={currentAnswer}
                        correctAnswer={questions[currentQuestionIndex].answer}
                    />
                    <button 
                        disabled={currentAnswer === null} 
                        className={currentAnswer === null ? 'button-disable' : 'button'}
                        onClick={handleNextQuestion}
                    >
                        {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                    </button>
                </div>
            ) : (
                <div className="score-box">
                    🎉 Your final score is {score}/{questions.length}
                    <br /><br />
                    <button onClick={handleRestart}>Restart Quiz</button>
                </div>
            )}
        </div>
    )
}
