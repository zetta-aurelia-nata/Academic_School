import { Assessment } from './pages/assessments-list/assessment.list.model';
import { Question } from './models/question.model';

export const ASSESSMENTS: Assessment[] = [
  {
    id: 1,
    title: 'Mathematics Quiz',
    subject: 'Mathematics',
    grade: 'Grade 10',
    totalStudents: 25,
    status: 'Completed',
    date: '2026-05-20',
  },
  {
    id: 2,
    title: 'English Literature Essay',
    subject: 'English Literature',
    grade: 'Grade 11',
    totalStudents: 28,
    status: 'Pending',
    date: '2026-05-19',
  },
  {
    id: 3,
    title: 'Science Chapter 5 Test',
    subject: 'Science',
    grade: 'Grade 9',
    totalStudents: 30,
    status: 'Completed',
    date: '2026-05-18',
  },
  {
    id: 4,
    title: 'History Midterm',
    subject: 'History',
    grade: 'Grade 10',
    totalStudents: 27,
    status: 'Failed',
    date: '2026-05-17',
  },
  {
    id: 5,
    title: 'Biology Chapter 3 Quiz',
    subject: 'Biology',
    grade: 'Grade 10',
    totalStudents: 20,
    status: 'Draft',
    date: '2026-05-25',
  },
];

// ********** MOCK QUESTIONS PER ASSESSMENT **********
export const ASSESSMENT_QUESTIONS: Record<number, Question[]> = {
  1: [
    {
      id: 101,
      type: 'multiple_choice',
      text: 'What is the value of π (pi) rounded to two decimal places?',
      points: 10,
      options: [
        { text: '3.14', isCorrect: true },
        { text: '3.41', isCorrect: false },
        { text: '3.16', isCorrect: false },
        { text: '3.12', isCorrect: false },
      ],
    },
    {
      id: 102,
      type: 'essay',
      text: 'Explain the Pythagorean theorem and provide an example of its application.',
      points: 20,
      maxWord: 200,
    },
  ],
  2: [
    {
      id: 201,
      type: 'essay',
      text: 'Analyze the main theme of the novel and discuss how the author develops it throughout the story.',
      points: 50,
      maxWord: 500,
    },
    {
      id: 202,
      type: 'essay',
      text: 'Compare and contrast the protagonist and antagonist of the story.',
      points: 30,
      maxWord: 300,
    },
  ],
  3: [
    {
      id: 301,
      type: 'multiple_choice',
      text: 'Which organelle is responsible for producing energy in a cell?',
      points: 10,
      options: [
        { text: 'Nucleus', isCorrect: false },
        { text: 'Mitochondria', isCorrect: true },
        { text: 'Ribosome', isCorrect: false },
        { text: 'Golgi apparatus', isCorrect: false },
      ],
    },
    {
      id: 302,
      type: 'essay',
      text: 'Describe the process of photosynthesis and its importance to living organisms.',
      points: 20,
      maxWord: 250,
    },
  ],
  4: [
    {
      id: 401,
      type: 'multiple_choice',
      text: 'Which event is considered the immediate cause of World War I?',
      points: 15,
      options: [
        { text: 'The assassination of Archduke Franz Ferdinand', isCorrect: true },
        { text: 'The signing of the Treaty of Versailles', isCorrect: false },
        { text: 'The invasion of Poland', isCorrect: false },
        { text: 'The Russian Revolution', isCorrect: false },
      ],
    },
    {
      id: 402,
      type: 'multiple_choice',
      text: 'Which alliance did Germany belong to before World War I?',
      points: 10,
      options: [
        { text: 'Triple Entente', isCorrect: false },
        { text: 'Triple Alliance', isCorrect: true },
        { text: 'Warsaw Pact', isCorrect: false },
        { text: 'League of Nations', isCorrect: false },
      ],
    },
  ],
  5: [
    {
      id: 501,
      type: 'multiple_choice',
      text: 'What is the basic functional unit of the kidney?',
      points: 10,
      options: [
        { text: 'Neuron', isCorrect: false },
        { text: 'Nephron', isCorrect: true },
        { text: 'Alveolus', isCorrect: false },
        { text: 'Villus', isCorrect: false },
      ],
    },
    {
      id: 502,
      type: 'essay',
      text: 'Explain the difference between mitosis and meiosis.',
      points: 20,
      maxWord: 250,
    },
  ],
};