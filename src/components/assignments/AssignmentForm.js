import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';

const initialFValues = {
    id: 0,
    assignment_name: '',
    subject_name: '',
    faculty_id: '',
    deadline: new Date(),
    total_marks: 0,
    is_show: false,
    faculty_submission_id: '',
    submission_list_ids: [],
    // subjectId: "",
    // assDate: new Date(),
    // startTime: new Date(),
    // duration: "", //in minutes
    // statusId: "1",
};

export default function AssignmentForm(props) {
    const { addOrEdit, recordForEdit, user } = props;
    initialFValues.faculty_id = user._id;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('assignment_name' in fieldValues)
            temp.assignment_name = fieldValues.assignment_name
                ? ''
                : 'This field is required.';
        if ('subject_name' in fieldValues)
            temp.subject_name = fieldValues.subject_name
                ? ''
                : 'This field is required.';
        // if ('deadline' in fieldValues)
        //     temp.deadline = fieldValues.deadline
        //         ? ''
        //         : 'This field is required.';

        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === '');
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit,
            });
    }, [recordForEdit, setValues]);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="assignment_name"
                        label="Assignment Name"
                        value={values.assignment_name}
                        onChange={handleInputChange}
                        error={errors.assignment_name}
                    />
                    <Controls.Input
                        name="subject_name"
                        label="Subject Name"
                        value={values.subject_name}
                        onChange={handleInputChange}
                        error={errors.subject_name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="faculty_id"
                        label="Faculty ID"
                        value={values.faculty_id}
                        onChange={handleInputChange}
                        error={errors.faculty_id}
                        disabled={true}
                    />
                    <Controls.Checkbox
                        name="is_show"
                        label="Show to Student"
                        value={values.is_show}
                        onChange={handleInputChange}
                    />
                    {/* fixme: dateandtime picker for deadline not working */}
                    {/* <Controls.DatePicker
                        name="deadline"
                        label="Submission Deadline"
                        value={values.deadline}
                        onChange={handleInputChange}
                    /> */}
                    {/* <Controls.DateTimePicker
                        name="deadline"
                        label="Submission Deadline"
                        value={values.deadline}
                        onChange={handleInputChange}
                    /> */}

                    {/* <Controls.TimePicker
                        name="startTime"
                        label="Starting time"
                        value={values.startTime}
                        onChange={handleInputChange}
                    /> */}
                    {/* <Controls.Input
                        name="duration"
                        label="Assignment Duration (in minutes)"
                        value={values.duration}
                        onChange={handleInputChange}
                        error={errors.duration}
                    /> */}
                    <div style={{ marginTop: '20px' }}>
                        <Controls.Button type="submit" text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
}
