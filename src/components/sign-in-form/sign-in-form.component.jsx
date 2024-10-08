import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
 } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styless.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async (event) => {
        event.preventDefault(); 
        // console.log(event);
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        resetFormFields();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
           // reseteamos despues de escribir
            resetFormFields();
        }catch (error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/invalid-credential':
                    alert('Invalid Email or incorrect password');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value });
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={ handleSubmit }>
                
                <FormInput label='Email' type="email" name="email" onChange={handleChange} value={email} required></FormInput>
               
                <FormInput label='Password' type="password" name="password" onChange={handleChange} value={password} required></FormInput>
           
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType="google" onClick={ signInWithGoogle }>Google Sign In</Button>    
                </div>
                
            </form>
        </div>
    );
};

export default SignInForm;