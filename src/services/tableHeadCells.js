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
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const assiCellsStudent = [
    { id: 'assignment_name', label: 'Assignment Name' },
    { id: 'subject_name', label: 'Subject' },
    { id: 'faculty_id', label: 'Faculty ID' },
    // { id: 'deadline', label: 'Deadline' },
    // { id: 'assDate', label: 'Date' },
    // { id: 'startTime', label: 'Time' },
    // { id: "duration", label: "Duration" },
    // { id: 'total_marks', label: 'Score' },
    // { id: 'is_show', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const assiCellsFaculty = [
    { id: 'assignment_name', label: 'Assignment Name' },
    { id: 'subject_name', label: 'Subject' },
    // { id: 'faculty_id', label: 'Faculty ID' },
    // { id: 'deadline', label: 'Deadline' },
    // { id: 'assDate', label: 'Date' },
    // { id: 'startTime', label: 'Time' },
    // { id: "duration", label: "Duration" },
    { id: 'total_marks', label: 'Score' },
    { id: 'is_show', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const assiCellsAdmin = [
    { id: 'assignment_name', label: 'Assignment Name' },
    { id: 'subject_name', label: 'Subject' },
    { id: 'faculty_id', label: 'Faculty ID' },
    // { id: 'deadline', label: 'Deadline' },
    // { id: 'assDate', label: 'Date' },
    // { id: 'startTime', label: 'Time' },
    // { id: "duration", label: "Duration" },
    { id: 'total_marks', label: 'Score' },
    { id: 'is_show', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const subCellsFaculty = [
    // { id: 'submission_id', label: 'Submission Id' },
    { id: 'user_name', label: 'Student Name', disableSorting: true },
    { id: 'marks', label: 'Marks', disableSorting: true },
    { id: 'evaluated_no_qna', label: 'Evaluated QnA', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const qurCellsFaculty = [
    { id: 'query_flag', label: 'Status', disableSorting: true },
    { id: 'user_name', label: 'Student Name', disableSorting: true },
    { id: 'question', label: 'Question', disableSorting: true },
    {
        id: 'query_description',
        label: 'Query Description',
        disableSorting: true,
    },
    { id: 'marks', label: 'Marks', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

export {
    userCellsFaculty,
    userCellsAdmin,
    assiCellsStudent,
    assiCellsFaculty,
    assiCellsAdmin,
    subCellsFaculty,
    qurCellsFaculty,
};
