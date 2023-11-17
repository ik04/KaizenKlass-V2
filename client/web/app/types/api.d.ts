interface Subject {
  subject: string;
  subject_uuid: string;
}
interface Assignment {
  title: string;
  assignment_uuid: string;
  subject: string;
  subject_uuid: string;
  deadline?: string;
}
interface AssignmentWithDeadline {
  title: string;
  assignment_uuid: string;
  deadline: string;
}
