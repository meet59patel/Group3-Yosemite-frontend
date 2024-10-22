import axios from 'axios';
const API = 'https://yosemite-sen.herokuapp.com';
// const API = 'http://localhost:8000';

const userAPI = `${API}/users`;
const assignmentAPI = `${API}/assignment`;
const submissionAPI = `${API}/submission`;
const qnaFacultyAPI = `${API}/faculty/qna`;
const qnaStudentAPI = `${API}/qna`;
const autoEvaluationAPI = `${API}/evaluate`;
const statusAPI = `${API}/stats`;

class AutoEvaluationService {
    static evaluateAssignment = (assi_id) => {
        return axios({
            method: 'GET',
            url: `${autoEvaluationAPI}/assi/${assi_id}`,
        });
    };

    static evaluateSubmission = (fac_sub_id, sub_id) => {
        return axios({
            method: 'GET',
            url: `${autoEvaluationAPI}/sub/${fac_sub_id}/${sub_id}`,
        });
    };

    static evaluateQuestion = (fac_sub_id, sub_id, qna_id) => {
        return axios({
            method: 'GET',
            url: `${autoEvaluationAPI}/qna/${fac_sub_id}/${sub_id}/${qna_id}`,
        });
    };
}

// const userSchema = {
//     user_name: { required, String },
//     email: { required, String },
//     password: { String },
//     role: { required, String , enum:['student','faculty','admin']},
//     profilepic: '',
//     assignment_list: [],
// };
class UserService {
    // GET | Get all Users list
    static getAllUsers = () => {
        return axios({
            method: 'GET',
            url: `${userAPI}`,
        });
    };

    static getRoleUsers = (role) => {
        return axios({
            method: 'GET',
            url: `${userAPI}/role/${role}`,
        });
    };

    // GET | Get specific User with _id
    static getUser = (id) => {
        return axios({
            method: 'GET',
            url: `${userAPI}/${id}`,
        });
    };

    // POST | Create new User
    static createUser = (user) => {
        return axios({
            method: 'POST',
            url: `${userAPI}`,
            data: user,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // PATCH | Update User data
    static updateUser = (user_id, user) => {
        return axios({
            method: 'PATCH',
            url: `${userAPI}/${user_id}`,
            data: user,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // DELETE | Delete User with _id
    static deleteUser = (id) => {
        return axios({
            method: 'DELETE',
            url: `${userAPI}/${id}`,
        });
    };
}

// const assignmentSchema = new mongoose.Schema({
//     assignment_name: { required, String },
//     subject_name: { required, String },
//     faculty_id: { required, object_id: 'User' },
//     total_marks: { Number },
//     deadline: { required, DATETIME },
//     is_show: { required, bool,False },
//     faculty_submission_id: { required, object_id: 'submission' },
//     submission_list_ids: [ { object_id: 'submission' } ]
// },
class AssignmentService {
    // GET | Get all Assignments
    static getAllAssignments = (user) => {
        return axios({
            method: 'GET',
            url: `${assignmentAPI}`,
            data: user,
        });
    };

    // GET | Get all faculty Assignments
    static getFacultyAssignments = (user) => {
        return axios({
            method: 'GET',
            url: `${assignmentAPI}/faculty/${user._id}`,
        });
    };

    // GET | Get all faculty Assignments
    static getStudentAssignments = (user) => {
        return axios({
            method: 'GET',
            url: `${assignmentAPI}/student`,
        });
    };

    // GET | Get specific Assignment with _id
    static getAssignment = (id) => {
        return axios({
            method: 'GET',
            url: `${assignmentAPI}/${id}`,
        });
    };

    // POST | Create new Assignment
    static createAssignment = (assignment) => {
        return axios({
            method: 'POST',
            url: `${assignmentAPI}`,
            data: assignment,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // PATCH | Update specific Assignment with _id
    static updateAssignment = (id, assignment) => {
        return axios({
            method: 'PATCH',
            url: `${assignmentAPI}/${id}`,
            data: assignment,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // DELETE | Delete specific Assignment with _id
    static deleteAssignment = (id) => {
        return axios({
            method: 'DELETE',
            url: `${assignmentAPI}/${id}`,
        });
    };
}

// const submissionSchema = new mongoose.Schema({
//     user_id: { required, object_id: 'User' },
//     assignment_id: { required, object_id: 'Assignment' },
//     marks: { required, Number },
//     qna_list: [{ object_id: 'QnA'}],
// },
class SubmissionService {
    // GET | Get the all submission
    static getAllSubmission = () => {
        return axios({
            method: 'GET',
            url: `${submissionAPI}`,
        });
    };

    // GET | Get specific submission with _id
    static getSubmission = (id) => {
        return axios({
            method: 'GET',
            url: `${submissionAPI}/${id}`,
        });
    };

    // POST | Create new submission
    static createSubmission = (submission) => {
        return axios({
            method: 'POST',
            url: `${submissionAPI}`,
            data: submission,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // PATCh | update specific submission with _id
    static updateSubmission = (id, submission) => {
        return axios({
            method: 'PATCH',
            url: `${submissionAPI}/${id}`,
            data: submission,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // DELETE | delete specific submission with _id
    static deleteSubmission = (id) => {
        return axios({
            method: 'DELETE',
            url: `${submissionAPI}/${id}`,
        });
    };
}

// const qnaFacultySchema = new mongoose.Schema({
//     question: { String, required },
//     answer: { String },
//     marks: { String },
// });
class FacultyQnAService {
    // GET | Get all qna
    static getAllQnA = () => {
        return axios({
            method: 'GET',
            url: `${qnaFacultyAPI}`,
        });
    };

    // POST | Create new qna
    static createQnA = (QnA) => {
        return axios({
            method: 'POST',
            url: `${qnaFacultyAPI}`,
            data: QnA,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // GET | Get specific qna with _id
    static getQnA = (id) => {
        return axios({
            method: 'GET',
            url: `${qnaFacultyAPI}/${id}`,
        });
    };

    // PATCH | update specific qna with _id
    static updateQnA = (id, QnA) => {
        return axios({
            method: 'PATCH',
            url: `${qnaFacultyAPI}/${id}`,
            data: QnA,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // DELETE | delete specific qna with _id
    static deleteQnA = (id) => {
        return axios({
            method: 'DELETE',
            url: `${qnaFacultyAPI}/${id}`,
        });
    };
}

// const qnaStudentSchema = new mongoose.Schema({
//     qna_faculty_id: {
//         required,
//         object_id: 'QnAs',
//     },
//     answer: { String },
//     evaluation_status: { String, 'pending' },
//     model_marks: { Number, 0 },
//     query_flag: { Boolean, false },
//     query_description: {  String },
//     final_marks: { Number, 0 },
// });
class StudentQnAService {
    // GET | Get all qna
    static getAllQnA = () => {
        return axios({
            method: 'GET',
            url: `${qnaStudentAPI}`,
        });
    };

    // POST | Create new qna
    static createQnA = (QnA) => {
        return axios({
            method: 'POST',
            url: `${qnaStudentAPI}`,
            data: QnA,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // GET | Get specific qna with _id
    static getQnA = (id) => {
        return axios({
            method: 'GET',
            url: `${qnaStudentAPI}/${id}`,
        });
    };

    // PATCH | update specific qna with _id
    static updateQnA = (id, QnA) => {
        return axios({
            method: 'PATCH',
            url: `${qnaStudentAPI}/${id}`,
            data: QnA,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // DELETE | delete specific qna with _id
    static deleteQnA = (id) => {
        return axios({
            method: 'DELETE',
            url: `${qnaStudentAPI}/${id}`,
        });
    };
}
class statusService {
    // GET | Get results[i] = No of Users registered on (current - i)th day
    static getRegiUserWeekly = () => {
        return axios({
            method: 'GET',
            url: `${statusAPI}/countOfNewUserDuringLastWeek`,
        });
    };

    // GET | Get results[i] = No of users on (current - i)th day.
    static getUserWeekly = () => {
        return axios({
            method: 'GET',
            url: `${statusAPI}/countOfUserDuringLastWeek`,
        });
    };

    // GET | Get assignments[i] = assignments made on the (current - i)th day
    static getCreatedAssiWeekly = () => {
        return axios({
            method: 'GET',
            url: `${statusAPI}/assignmentsOfLastWeek`,
        });
    };

    // GET | Get Total number of students that were assigned the assignments
    // and how many of them submitted till now
    static getAssiSubmissionInfo = () => {
        return axios({
            method: 'GET',
            url: `${statusAPI}/assignmentInfo`,
        });
    };

    // GET | GetNumber of answers faculty has evaluted and is yet to evalute
    // This route expecting to pass the questionPaperId
    static getAssiEvaluatedInfo = (id) => {
        return axios({
            method: 'GET',
            url: `${statusAPI}/facultyAnswerInfo/${id}`,
        });
    };
}

export {
    UserService,
    AssignmentService,
    SubmissionService,
    FacultyQnAService,
    StudentQnAService,
    AutoEvaluationService,
    statusService,
};
