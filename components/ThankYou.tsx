import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

export const ThankYou: React.FC = () => {
    return (
        <div className="text-center p-8 flex flex-col items-center justify-center animate-fade-in">
            <CheckCircleIcon className="w-24 h-24 text-brand-gold mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-blue mb-4 font-serif">Obrigado!</h2>
            <p className="text-lg text-brand-blue/90 max-w-md">
                Sua participação foi registrada com sucesso. Suas respostas são muito importantes para nós e ajudarão a criar uma Lex Cortinare ainda melhor para você.
            </p>
        </div>
    );
};