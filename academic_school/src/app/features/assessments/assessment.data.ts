import { Assessment } from './pages/assessments-list/assessment.list.model';

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