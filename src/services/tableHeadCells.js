const userCellsAdmin = [
    { id: 'user_name', label: 'User Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'role', label: 'Role' },
    // { id: 'password', label: 'password' },
    // { id: 'profilepic', label: 'profilepic' },
    // { id: 'assignment_list', label: 'assignment_list' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const userCellsFaculty = [
    { id: 'user_name', label: 'User Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'role', label: 'Role' },
];

const assiCellsAdmin = [
    { id: 'assignment_name', label: 'Assignment Name' },
    { id: 'subject_name', label: 'Subject' },
    { id: 'faculty_id', label: 'Faculty ID' },
    // { id: 'deadline', label: 'Deadline' },
    { id: 'total_marks', label: 'Total score' },
    { id: 'is_show', label: 'Status' },
    // { id: 'faculty_submission_id', label: 'faculty_submission_id' },
    // { id: 'submission_list_ids', label: 'submission_list_ids' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const assiCellsFaculty = [
    { id: 'assignment_name', label: 'Assignment Name' },
    { id: 'subject_name', label: 'Subject' },
    { id: 'faculty_id', label: 'Faculty ID' },
    // { id: 'deadline', label: 'Deadline' },
    { id: 'total_marks', label: 'Total score' },
    { id: 'is_show', label: 'Status' },
    // { id: 'faculty_submission_id', label: 'faculty_submission_id' },
    // { id: 'submission_list_ids', label: 'submission_list_ids' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const subCellsFaculty = [
    // { id: 'submission_id', label: 'Submission Id' },
    { id: 'user_name', label: 'Student Name' },
    { id: 'marks', label: 'Marks' },
    { id: 'evaluated_no_qna', label: 'Evaluated QnA' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const qurCellsFaculty = [
    // { id: 'query_flag', lsabel: 'Status' },
    { id: 'user_name', label: 'Student Name' },
    { id: 'question', label: 'Question' },
    { id: 'query_description', label: 'Query Description' },
    { id: 'marks', label: 'Marks' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

// const assiCellsFaculty = [
//     // { id: 'assId', label: 'Assignment Id' },
//     { id: 'subjectName', label: 'Subject Name' },
//     // { id: 'facultyID', label: 'Faculty ID' },
//     { id: 'submissionDeadline', label: 'Submission Deadline' },
//     { id: 'total', label: 'Total score' },
//     // { id: 'assDate', label: 'Date' },
//     // { id: 'startTime', label: 'Time' },
//     // { id: "duration", label: "Duration" },
//     // { id: 'status', label: 'Status' },
//     { id: 'actions', label: 'Actions', disableSorting: true },
// ];

const assiCellsStudent = [
    // { id: 'assId', label: 'Assignment Id' },
    { id: 'subjectName', label: 'Subject Name' },
    { id: 'facultyID', label: 'Faculty ID' },
    { id: 'submissionDeadline', label: 'Submission Deadline' },
    { id: 'total', label: 'Total score' },
    // { id: 'assDate', label: 'Date' },
    // { id: 'startTime', label: 'Time' },
    // { id: "duration", label: "Duration" },
    // { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

export {
    userCellsAdmin,
    userCellsFaculty,
    assiCellsAdmin,
    assiCellsFaculty,
    assiCellsStudent,
    subCellsFaculty,
    qurCellsFaculty,
};
