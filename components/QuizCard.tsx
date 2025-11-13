import React from 'react';
import { Question } from '../types';

interface QuizCardProps {
    question: Question;
    selectedOptions: string[];
    onOptionToggle: (option: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, selectedOptions, onOptionToggle }) => {
    const hasOddOptions = question.options.length % 2 !== 0;

    return (
        <div className="w-full max-w-3xl mx-auto animate-fade-in">
            {question.subText && <p className="text-center text-base md:text-lg text-brand-blue/80 mb-4">{question.subText}</p>}
            <h2 className="text-center text-2xl md:text-3xl font-semibold text-brand-blue mb-8 font-serif">
                {question.text}
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {question.options.map((option, index) => {
                    const isSelected = selectedOptions.includes(option);
                    const isLastItem = index === question.options.length - 1;
                    return (
                        <button
                            key={option}
                            onClick={() => onOptionToggle(option)}
                            className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-opacity-50 ${
                                isSelected
                                    ? 'bg-brand-blue border-brand-gold text-white shadow-lg'
                                    : 'bg-white border-brand-blue text-brand-blue hover:border-brand-gold'
                            } ${hasOddOptions && isLastItem ? 'col-span-2' : ''}`}
                        >
                            <span className="font-medium text-base">{option}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};