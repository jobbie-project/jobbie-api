import { User } from "@/modules/user/user.entity";
import { Resume } from "./resumed.interface";
import moment from "moment-timezone";

export function castUserToResumed(user: User): Partial<Resume> {
  const studentCurriculum = user.student.curriculum;
  const payload: Partial<Resume> = {
    basics: {
      email: user.email,
      name: user.name,
    },
    education: [
      {
        area: studentCurriculum.fatec_course.name,
        institution: studentCurriculum.fatec_institution.name,
        startDate: moment(studentCurriculum.fatec_start_date).locale("pt").format("DD-MM-YYYY"),
        studyType: "Graduação",
      },
      ...studentCurriculum.education.map((education) => ({
        institution: education.institution_name,
        area: education.course,
        startDate: moment(education.start_date).locale("pt").format("DD-MM-YYYY"),
        endDate: moment(education.end_date).locale("pt").format("DD-MM-YYYY"),
        studyType: education.degree,
      })),
    ],
    work: studentCurriculum.previous_experience.map((job) => ({
      name: job.company_name,
      position: job.position,
      startDate: moment(job.start_date).locale("pt").format("DD-MM-YYYY"),
      endDate: moment(job.end_date).locale("pt").format("DD-MM-YYYY"),
      summary: job.description,
      location: `${job.location.city}, ${job.location.state}`,
    })),
    awards: studentCurriculum.certifications.map((certification) => {
      return {
        title: certification,
      };
    }),
  };
  return payload;
}
