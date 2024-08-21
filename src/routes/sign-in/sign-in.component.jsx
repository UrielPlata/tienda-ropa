import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth,} from '../../utils/firebase/firebase.utils.js'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';

const SignIn = () =>{

    //Con el useeffect vamos a remontar la app despues de redireccionar
    // y con auth obtenemos el resultado del redirect
    // useEffect(() => {
    //     (async () => {
    //       const response = await getRedirectResult(auth);
    //       console.log(response);
    //       if (response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //       }
    //     })();
    //   }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };


    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm></SignUpForm>
        </div>
    );
};

export default SignIn;