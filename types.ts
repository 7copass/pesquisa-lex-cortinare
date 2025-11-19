export interface InputField {
  name: string;
  label: string;
  placeholder: string;
  inputType?: 'text' | 'tel' | 'email';
}

export interface Question {
  id: number;
  type: 'selection' | 'form';
  text: string;
  subText?: string;
  options?: string[];
  inputs?: InputField[];
}