import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm, Form } from "../useForm";
import * as AssignmentService from "./AssignmentService";

const initialFValues = {
    id: 0,
    assId: "",
    assName: "",
    assDate: new Date(),
    startTime: new Date(),
    duration: "", //in minutes
    statusId: "1",
};

export default function AssignmentForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("fullName" in fieldValues)
            temp.fullName = fieldValues.fullName
                ? ""
                : "This field is required.";
        if ("email" in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ""
                : "Email is not valid.";
        if ("departmentId" in fieldValues)
            temp.departmentId =
                fieldValues.departmentId.length !== 0
                    ? ""
                    : "This field is required.";
        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
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
                        name="assName"
                        label="Assignment Name"
                        value={values.assName}
                        onChange={handleInputChange}
                        error={errors.assName}
                    />
                    <Controls.Input
                        name="assId"
                        label="Assignment Id"
                        value={values.assId}
                        onChange={handleInputChange}
                        error={errors.assId}
                    />
                    <Controls.Select
                        name="statusId"
                        label="Status"
                        value={values.statusId}
                        onChange={handleInputChange}
                        options={AssignmentService.getStatusCollection()}
                        error={errors.statusId}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.DatePicker
                        name="assDate"
                        label="Date"
                        value={values.assDate}
                        onChange={handleInputChange}
                    />
                    <Controls.TimePicker
                        name="startTime"
                        label="Starting time"
                        value={values.startTime}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="duration"
                        label="Assignment Duration (in minutes)"
                        value={values.duration}
                        onChange={handleInputChange}
                        error={errors.duration}
                    />
                    <div style={{ marginTop: "20px" }}>
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
