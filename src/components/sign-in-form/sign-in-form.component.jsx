import { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} =formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const SignInWithGoogle = async() =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('email not registered');
                    break;
            }
           console.log(error);
        }
    } 

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>sign up with your email</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label = "Email" 
                    required
                    onChange={handleChange} 
                    name = "email"
                    value = {email}
                    />
                <FormInput
                    label = "Password" 
                    type = "password"
                    required
                    onChange={handleChange} 
                    name = "password"
                    value = {password}
                    />
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type='button' buttonType={'google'} onClick={SignInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;