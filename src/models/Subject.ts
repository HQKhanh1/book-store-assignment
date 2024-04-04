interface Subjects {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: Book[]; // Array of Work objects
}
