import axios from 'axios';
const API = 'https://yosemite-sen.herokuapp.com';

const userAPI = `${API}/users`;
const paperAPI = `${API}/questionpaper`;
const qnaAPI = `${API}/questions`;
const answerAPI = `${API}/answers`;
const statusAPI = `${API}/stats`;

// const userSchema = new mongoose.Schema({
//     username: { required, String, unique },
//     email: { required, String, unique },
//     password: { String },
//     profilepic: { Buffer },
//     role: { String }
// }
class UserService {
    // GET | Get all Users list
    static getAllUsers = () => {
        return axios({
            method: 'GET',
            url: `${userAPI}`,
        });
    };

    // GET | Get User with email
    static getUser = (id) => {
        return axios({
            method: 'GET',
            url: `${userAPI}/${id}`,
        });
    };

    // POST | Create User
    static createUser = (user) => {
        return axios({
            method: 'POST',
            url: `${userAPI}`,
            data: user,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // PUT | Update User
    static updateUser = (user) => {
        return axios({
            method: 'PUT',
            url: `${userAPI}/${user._id}`,
            data: user,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // DELETE | Delete User
    static deleteUser = (id) => {
        return axios({
            method: 'DELETE',
            url: `${userAPI}/${id}`,
        });
    };
}

// const questionPaperSchema = new mongoose.Schema({
//     facultyID: { required, 'User'},
//     questionPaperDescription: { String },
//     submissionDeadline: { required, Date},
//     subjectName: { required, String },
//     total: { Number }
// }
// const studentQuestionRelationSchema = new mongoose.Schema({
//     studentID: { required, 'User' },
//     questionPaperID: { require, "QuestionPaper" },
//     isSubmitted: { Boolean, false },
// }
class AssignmentService {
    // GET | Get all QuestionPapers
    static getAllAssignments = () => {
        return axios({
            method: 'GET',
            url: `${paperAPI}`,
        });
    };

    // POST | Create new QuestionPaper
    static createAssignment = (assignment) => {
        return axios({
            method: 'POST',
            url: `${paperAPI}`,
            data: assignment,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // PUT | Update QuestionPaper
    static updateAssignment = (id, assignment) => {
        return axios({
            method: 'PUT',
            url: `${paperAPI}/${id}`,
            data: assignment,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // Todo : DELETE | Delete QuestionPaper
    // static deleteAssignment = (id) => {
    //     return axios({
    //         method: 'DELETE',
    //         url: `${paperAPI}/${id}`,
    //     });
    // };

    // GET | Get all question papers list created by faculty
    static getAllFacultyAssignments = (id) => {
        return axios({
            method: 'GET',
            url: `${paperAPI}/faculty/${id}`,
        });
    };

    // GET | Get the all question (without answers) using questionPaperId
    static getAssignmentAllQuestion = (id) => {
        return axios({
            method: 'GET',
            url: `${paperAPI}/${id}`,
        });
    };
}

// const questionSchema = new mongoose.Schema({
//     questionPaperID: { required, 'QuestionPaper'},
//     question: { required, String },
//     ansByFaculty: { required, String },
//     marks: { required, Number },
// }
class QnAService {
    // GET | Get the all Questions (with answers)
    static getAllQnA = () => {
        return axios({
            method: 'GET',
            url: `${qnaAPI}`,
        });
    };

    // GET | Get the all Questions (with answers) by QuestionPaperID
    static getPaperQnA = (id) => {
        return axios({
            method: 'GET',
            url: `${qnaAPI}/paperid/${id}`,
        });
    };

    // POST | Create new Question
    static createQnA = (question) => {
        return axios({
            method: 'POST',
            url: `${qnaAPI}`,
            data: { question },
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // PUT | Update Question
    static updateQnA = (id, question) => {
        return axios({
            method: 'PUT',
            url: `${qnaAPI}/${id}`,
            data: { question },
            headers: { 'Content-Type': 'application/json' },
        });
    };

    //TODO: DELETE | Delete Question
    // static deleteQnA = (id) => {
    //     return axios({
    //         method: 'DELETE',
    //         url: `${qnaAPI}/${id}`,
    //     });
    // };
}

// const answerSchema = new mongoose.Schema({
//     studentID: { required, 'User' },
//     questionID: { required, 'Question' },
//     questionPaperID: { required, "QuestionPaper" },
//     ans: { required, String },
//     marks_by_model: { Number },
//     final_marks: {Number},
//     is_evaluted: { Boolean, false },
//     query_flag: { Boolean, false },
// }
class AnsService {
    // POST | POST for saving answer to a question
    static createAns = (answer) => {
        return axios({
            method: 'POST',
            url: `${answerAPI}`,
            data: answer,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    // PUT | PUT update answer
    static createAns = (id, answer) => {
        return axios({
            method: 'PUT',
            url: `${answerAPI}/${id}`,
            data: answer,
            headers: { 'Content-Type': 'application/json' },
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
    QnAService,
    AnsService,
    statusService,
};
