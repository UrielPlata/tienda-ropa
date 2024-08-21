import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styless.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {displayName} );
            // reseteamos despues de escribir
            resetFormFields();
        }catch (error){

            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot creat user, the email already in use');
            }else{
                console.log('user creation encountered error', error);
            }
            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't you have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={ handleSubmit }>
                
                <FormInput label='Display Name' type="text" name="displayName" onChange={handleChange} value={displayName} required></FormInput>
                
                <FormInput label='Email' type="email" name="email" onChange={handleChange} value={email} required></FormInput>
               
                <FormInput label='Password' type="password" name="password" onChange={handleChange} value={password} required></FormInput>
           
                <FormInput label='Confirm Password' type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required></FormInput>
                <Button buttonType='inverted' type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;