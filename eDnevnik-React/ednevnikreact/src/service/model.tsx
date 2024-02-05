export  interface SchoolGrade {
  id: number;
  name_of_school_grade: string;
}

export  interface Professor {
  id: number;
  name_surname: string;
  email: string;
  password: string;
}

export  interface StudentParent {
  id: number;
  name_surname: string;
  email: string;
  password: string;
}

export  interface Student {
  id: number;
  name_surname: string;
  age: number;
  email: string;
  password: string;
  parent: StudentParent;
}

export  interface Subject {
  id: number;
  subject_name: string;
  professor: Professor;
  schoolGrade: SchoolGrade;
}

export interface GradeType {
  id: number;
  grade_type_name: string;
}

export interface Grade {
  date: Date;
  grade: string;
  subject: Subject;
  student: Student;
  gradeType: GradeType;
  professor: Professor;
}

export interface Admin {
  id: number;
  email: string;
  password: string;
}
