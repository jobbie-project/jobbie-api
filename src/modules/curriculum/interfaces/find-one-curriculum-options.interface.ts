export interface FindOneCurriculumOptions {
  key: "id" | "student_id" | "fatec_course_id" | "fatec_institution_id";
  value: string;
  relations?: string[];
}
