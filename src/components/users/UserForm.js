import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';

const getRoleCollection = () => [
    { id: 'student', title: 'Student' },
    { id: 'faculty', title: 'Faculty' },
    { id: 'admin', title: 'Admin' },
];

const initialFValues = {
    id: 0,
    user_name: '',
    email: '',
    role: '',
};

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('user_name' in fieldValues)
            temp.user_name = fieldValues.user_name
                ? ''
                : 'This field is required.';
        if ('email' in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ''
                : 'Email is not valid.';
        if ('role' in fieldValues)
            temp.role = fieldValues.role ? '' : 'This field is required.';
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
                        name="user_name"
                        label="User Name"
                        value={values.user_name}
                        onChange={handleInputChange}
                        error={errors.user_name}
                    />
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="role"
                        label="Role"
                        value={values.role}
                        onChange={handleInputChange}
                        options={getRoleCollection()}
                        error={errors.role}
                    />

                    <div>
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
