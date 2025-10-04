import React from 'react'

export default function QuestionList({question, options , handleClick, currentAnswer, correctAnswer}) {
    return (
        <div>
            <h2>{question}</h2>
            <ul>
                {options.map((option,index)=> {
                    // Decide CSS class based on correctness
                    let className = "";
                    if(currentAnswer){
                        if(option === correctAnswer) className = "correct"; // Green if correct
                        else if(option === currentAnswer && option !== correctAnswer) className = "incorrect"; // Red if wrong
                    }
                    return (
                        <li 
                            key={index} 
                            onClick={()=>!currentAnswer && handleClick(option)} 
                            className={className}
                        >
                            {option}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
