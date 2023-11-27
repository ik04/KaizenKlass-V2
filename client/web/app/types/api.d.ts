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
  description?: string;
  content?: string;
  link: string;
}
interface AssignmentWithDeadline {
  title: string;
  assignment_uuid: string;
  deadline: string;
}
interface Solution {
  content: string;
  solution_uuid: string;
  description: string;
  username: string;
}

interface Subject {
  subject: string;
  subject_uuid: string;
}
