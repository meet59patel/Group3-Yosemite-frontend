const KEYS = {
    assignments: "assignments",
    assignmentId: "assignmentId",
};

export const getStatusCollection = () => [
    { id: "1", title: "Created Successfully" },
    { id: "2", title: "Evalution Pending" },
    { id: "3", title: "Evaluated Successfully" },
];

export function insertAssignment(data) {
    let assignments = getAllAssignments();
    data["id"] = generateAssignmentId();
    assignments.push(data);
    localStorage.setItem(KEYS.assignments, JSON.stringify(assignments));
}

export function updateAssignment(data) {
    let assignments = getAllAssignments();
    let recordIndex = assignments.findIndex((x) => x.id === data.id);
    assignments[recordIndex] = { ...data };
    localStorage.setItem(KEYS.assignments, JSON.stringify(assignments));
}

export function deleteAssignment(id) {
    let assignments = getAllAssignments();
    assignments = assignments.filter((x) => x.id !== id);
    localStorage.setItem(KEYS.assignments, JSON.stringify(assignments));
}

export function generateAssignmentId() {
    if (localStorage.getItem(KEYS.assignmentId) == null)
        localStorage.setItem(KEYS.assignmentId, "0");
    var id = parseInt(localStorage.getItem(KEYS.assignmentId));
    localStorage.setItem(KEYS.assignmentId, (++id).toString());
    return id;
}

export function getAllAssignments() {
    if (localStorage.getItem(KEYS.assignments) == null)
        localStorage.setItem(KEYS.assignments, JSON.stringify([]));
    let assignments = JSON.parse(localStorage.getItem(KEYS.assignments));
    //map statusId to status title
    let status = getStatusCollection();
    return assignments.map((x) => ({
        ...x,
        status: status[x.statusId - 1].title,
    }));
}
