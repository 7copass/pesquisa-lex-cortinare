import React from 'react';
import { Question } from './types';

export const Logo = () => (
    <div className="text-center my-6">
        <h1 className="text-5xl md:text-6xl font-bold text-brand-blue tracking-wider font-serif">
            LEX
        </h1>
        <h2 className="text-2xl md:text-3xl text-brand-gold tracking-widest font-light -mt-2 font-serif">
            CORTINARE
        </h2>
    </div>
);


export const QUIZ_DATA: Question[] = [
    {
        id: 1,
        type: 'selection',
        subText: "Eu vou te fazer algumas perguntas básicas.",
        text: "Se você fosse renovar um ambiente nos próximos meses, qual deles seria?",
        options: ["Sala de estar", "Sala de jantar", "Suíte", "Escritório", "Varanda", "Outro"],
    },
    {
        id: 2,
        type: 'selection',
        subText: "Maravilha. Mais uma.",
        text: "Quais categorias mais despertam seu interesse atualmente?",
        options: ["Cortinas", "Persianas", "Móveis sob medida", "Poltronas", "Mesas", "Itens de decoração"],
    },
    {
        id: 3,
        type: 'selection',
        subText: "Perfeito.",
        text: "O que mais pesa na sua escolha ao adquirir produtos para a casa?",
        options: ["Design", "Exclusividade", "Qualidade dos materiais", "Funcionalidade"],
    },
    {
        id: 4,
        type: 'selection',
        subText: "Estamos quase acabando.",
        text: "Em um período especial da Lex Cortinare, qual tipo de vantagem seria mais relevante para você?",
        options: ["Condição diferenciada no pagamento como parcelamento", "Curadoria personalizada", "Prioridade na produção", "Brinde exclusivo", "Valores especiais em itens selecionados"],
    },
    {
        id: 5,
        type: 'form',
        subText: "Para finalizar.",
        text: "Para quem devemos direcionar esse atendimento exclusivo?",
        inputs: [
            { name: 'name', label: 'Nome Completo', placeholder: 'Digite seu nome', inputType: 'text' },
            { name: 'phone', label: 'Telefone / WhatsApp', placeholder: '(DDD) 99999-9999', inputType: 'tel' }
        ]
    },
];