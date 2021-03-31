import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';

const initialFValues = {
    id: 0,
    subjectName: '',
    facultyID: '605f1c24d36f8b94df32f9b6',
    submissionDeadline: new Date(),
    total: 0,
    // subjectId: "",
    // assDate: new Date(),
    // startTime: new Date(),
    // duration: "", //in minutes
    // statusId: "1",
};

export default function AssignmentForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('subjectName' in fieldValues)
            temp.subjectName = fieldValues.subjectName
                ? ''
                : 'This field is required.';
        if ('submissionDeadline' in fieldValues)
            temp.submissionDeadline = fieldValues.submissionDeadline
                ? ''
                : 'This field is required.';
        if ('total' in fieldValues)
            temp.total =
                fieldValues.total.length !== 0 ? '' : 'This field is required.';
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
                        name="subjectName"
                        label="Subject Name"
                        value={values.subjectName}
                        onChange={handleInputChange}
                        error={errors.subjectName}
                    />
                    <Controls.Input
                        name="total"
                        label="Total Marks"
                        value={values.total}
                        onChange={handleInputChange}
                        error={errors.total}
                    />
                    {/* <Controls.Select
                        name="statusId"
                        label="Status"
                        value={values.facultyID}
                        onChange={handleInputChange}
                        options={getFacultyCollection()}
                        error={errors.facultyID}
                    /> */}
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="facultyID"
                        label="Faculty ID"
                        value={values.facultyID}
                        onChange={handleInputChange}
                        error={errors.facultyID}
                    />
                    <Controls.DatePicker
                        name="submissionDeadline"
                        label="Submission Deadline"
                        value={values.submissionDeadline}
                        onChange={handleInputChange}
                    />
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
