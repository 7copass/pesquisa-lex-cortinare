import React, { useState } from 'react';
import { QUIZ_DATA, Logo } from './constants';
import { QuizCard } from './components/QuizCard';
import { ThankYou } from './components/ThankYou';

export default function App() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});
    const [formData, setFormData] = useState<{ [key: string]: string }>({ name: '', phone: '' });
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const currentQuestion = QUIZ_DATA[currentQuestionIndex];
    const selectedOptions = currentQuestion && currentQuestion.type === 'selection' 
        ? answers[currentQuestion.id] || [] 
        : [];

    const handleOptionToggle = (option: string) => {
        setAnswers(prevAnswers => {
            const currentSelections = prevAnswers[currentQuestion.id] || [];
            const newSelections = currentSelections.includes(option)
                ? currentSelections.filter(item => item !== option)
                : [...currentSelections, option];
            return {
                ...prevAnswers,
                [currentQuestion.id]: newSelections,
            };
        });
    };

    const handleFormChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNextQuestion = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            if (currentQuestionIndex < QUIZ_DATA.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                setIsQuizCompleted(true);
                
                const payload = {
                    responses: QUIZ_DATA.map(q => {
                        let responseData: string[] = [];
                        
                        if (q.type === 'selection') {
                            responseData = answers[q.id] || [];
                        } else if (q.type === 'form') {
                            responseData = [
                                `Nome: ${formData.name}`, 
                                `Telefone: ${formData.phone}`
                            ];
                        }

                        return {
                            id: q.id,
                            question: q.text,
                            ...(q.subText && { subtext: q.subText }),
                            selected_options: responseData,
                        };
                    }),
                    submitted_at: new Date().toISOString(),
                    contact_info: formData // Sending separately as well for easier parsing if needed
                };
                
                const webhookUrl = 'https://editor.leaderaperformance.com.br/webhook/lex-cortinare';

                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Webhook successfully triggered.');
                    } else {
                        console.error('Webhook trigger failed.', response.status, response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error sending data to webhook:', error);
                });

                console.log("Quiz finished. Payload sent:", payload);
            }
            setIsFadingOut(false);
        }, 300); // This duration should match the fade-out transition
    };

    const progressPercentage = isQuizCompleted ? 100 : ((currentQuestionIndex + 1) / QUIZ_DATA.length) * 100;
    
    let isNextButtonDisabled = true;
    if (currentQuestion) {
        if (currentQuestion.type === 'selection') {
            isNextButtonDisabled = selectedOptions.length === 0;
        } else if (currentQuestion.type === 'form') {
            // Check if all defined inputs have values
            isNextButtonDisabled = currentQuestion.inputs 
                ? !currentQuestion.inputs.every(input => formData[input.name] && formData[input.name].trim() !== '')
                : false;
        }
    }

    return (
        <div className="bg-brand-off-white min-h-screen flex flex-col p-6">
            <header className="w-full max-w-3xl mx-auto">
                <Logo />
            </header>

            <main className="flex-grow flex items-center justify-center py-6">
                <div className={`w-full transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                    {!isQuizCompleted ? (
                        <QuizCard
                            key={currentQuestion.id} // Re-mounts the component on question change
                            question={currentQuestion}
                            selectedOptions={selectedOptions}
                            onOptionToggle={handleOptionToggle}
                            formData={formData}
                            onFormChange={handleFormChange}
                        />
                    ) : (
                        <ThankYou />
                    )}
                </div>
            </main>

            <footer className="w-full max-w-3xl mx-auto mt-auto pt-4">
                {!isQuizCompleted && (
                    <div className="animate-fade-in">
                        <div className="text-center text-sm text-brand-blue/70 mb-3 font-medium">
                            Passo {currentQuestionIndex + 1} de {QUIZ_DATA.length}
                        </div>
                        <div className="w-full bg-brand-blue/20 rounded-full h-2 mb-4">
                            <div
                                className="bg-brand-gold h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <button
                            onClick={handleNextQuestion}
                            disabled={isNextButtonDisabled}
                            className="w-full bg-brand-blue text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 ease-in-out hover:bg-opacity-95 focus:outline-none focus:ring-4 focus:ring-brand-gold focus:ring-opacity-50 disabled:bg-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transform hover:disabled:scale-100 hover:scale-105"
                        >
                            {currentQuestionIndex < QUIZ_DATA.length - 1 ? 'Próximo' : 'Finalizar'}
                        </button>
                    </div>
                )}
            </footer>
        </div>
    );
}