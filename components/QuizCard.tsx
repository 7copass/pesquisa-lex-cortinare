import React from 'react';
import { Question } from '../types';

interface QuizCardProps {
    question: Question;
    selectedOptions: string[];
    onOptionToggle: (option: string) => void;
    formData: { [key: string]: string };
    onFormChange: (name: string, value: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ 
    question, 
    selectedOptions, 
    onOptionToggle,
    formData,
    onFormChange
}) => {
    return (
        <div className="w-full max-w-3xl mx-auto animate-fade-in">
            {question.subText && <p className="text-center text-base md:text-lg text-brand-blue/80 mb-4">{question.subText}</p>}
            <h2 className="text-center text-2xl md:text-3xl font-semibold text-brand-blue mb-8 font-serif">
                {question.text}
            </h2>
            
            {question.type === 'selection' && question.options && (
                <div className="grid grid-cols-2 gap-4">
                    {question.options.map((option, index) => {
                        const isSelected = selectedOptions.includes(option);
                        const hasOddOptions = question.options!.length % 2 !== 0;
                        const isLastItem = index === question.options!.length - 1;
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
            )}

            {question.type === 'form' && question.inputs && (
                <div className="flex flex-col gap-6 max-w-md mx-auto">
                    {question.inputs.map((field) => (
                        <div key={field.name} className="flex flex-col text-left">
                            <label htmlFor={field.name} className="text-brand-blue font-semibold mb-2 ml-1">
                                {field.label}
                            </label>
                            <input
                                type={field.inputType || 'text'}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name] || ''}
                                onChange={(e) => onFormChange(field.name, e.target.value)}
                                className="p-4 border-2 border-brand-blue/30 rounded-lg text-brand-blue placeholder-brand-blue/40 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-white"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};