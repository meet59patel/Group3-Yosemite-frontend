import axios from 'axios';
const API = 'https://yosemite-sen.herokuapp.com';

class UserService {
    // GET | Get all Users list
    static getAllUsers = () => {
        return axios({
            method: 'GET',
            url: `${API}/users`,
            headers: {},
            params: {
                language_code: 'en',
            },
        });
    };

    // GET | Get User with email
    static getUser = (id) => {
        return `${API}/users/${id}`;
    };

    // POST | Create User
    static createUser = (user) => {
        return axios({
            method: 'POST',
            url: `${API}/users`,
            headers: {},
            data: user,
            params: {
                language_code: 'en',
            },
        });
    };

    // PUT | Update User
    static updateUser = (user) => {
        return axios({
            method: 'PUT',
            url: `${API}/users/${user._id}`,
            headers: {},
            data: user,
            params: {
                language_code: 'en',
            },
        });
    };

    // DELETE | Delete User
    static deleteUser = (id) => {
        return axios({
            method: 'DELETE',
            url: `${API}/users/${id}`,
            headers: {},
            params: {
                language_code: 'en',
            },
        });
    };
}

class AssignmentService {
    // GET | Get all QuestionPapers List
    static getAllAssignments = () => {
        return axios({
            method: 'GET',
            url: `${API}/questionpaper`,
            headers: {},
            params: {
                language_code: 'en',
            },
        });
    };

    // POST | Create new QuestionPaper
    static createAssignment = (assignment) => {
        return axios({
            method: 'POST',
            url: `${API}/questionpaper`,
            headers: {},
            data: assignment,
            params: {
                language_code: 'en',
            },
        });
    };

    // PUT | Update QuestionPaper
    static updateAssignment = (id, assignment) => {
        return axios({
            method: 'PUT',
            url: `${API}/questionpaper/${id}`,
            headers: {},
            data: assignment,
            params: {
                language_code: 'en',
            },
        });
    };

    // DELETE | Delete QuestionPaper
    static deleteAssignment = (id) => {
        return axios({
            method: 'DELETE',
            url: `${API}/questionpaper/${id}`,
            headers: {},
            params: {
                language_code: 'en',
            },
        });
    };

    // GET | Get all question papers created by faculty
    static getAllFacultyAssignments = (id) => {
        return axios({
            method: 'GET',
            url: `${API}/questionpaper/faculty/${id}`,
            headers: {},
            params: {
                language_code: 'en',
            },
        });
    };

    // GET | Get the all question (without answers) using questionPaperId
    static getAssignmentAllQuestion = (id) => {
        // return `${API}/questionpaper/${id}`;
        return axios({
            method: 'GET',
            url: `${API}/questionpaper/${id}`,
            headers: {},
            params: {
                language_code: 'en',
            },
        });
    };
}

class QnAService {
    // GET | Get the all Questions (with answers)
    static getAllQnA = () => {
        // return `${API}/questions`;
        return axios({
            method: 'GET',
            url: `${API}/questions`,
            headers: {},
            params: {
                language_code: 'en',
            },
        });
    };

    // GET | Get the all Questions (with answers) by QuestionPaperID
    static getPaperQnA = (id) => {
        // return `${API}/questions/paperid/${id}`;
        return axios({
            method: 'GET',
            url: `${API}/questions/paperid/${id}`,
            headers: {},
            params: {
                language_code: 'en',
            },
        });
    };

    // POST | Create new Question
    static createQnA = () => {
        return `${API}/questions`;
    };

    // PUT | Update Question
    static updateQnA = (id) => {
        return `${API}/questions/${id}`;
    };

    // DELETE | Delete Question
    static deleteQnA = (id) => {
        return `${API}/questions/${id}`;
    };
}

export { UserService, AssignmentService, QnAService };
