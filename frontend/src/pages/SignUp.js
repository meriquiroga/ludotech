import {useFormik } from 'formik';
import {useState} from 'react'
import * as Yup from "yup"
import { GoogleLogin } from 'react-google-login'
import {Link} from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const [error, setError] = useState('')

    let formik = useFormik({
        initialValues: {firstname: '', lastname: '', email: '', password: '', photo: 'default'},
        onSubmit: (values) => {
            console.log(values)
            axios.post('http://localhost:4000/api/signup', values)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.response.token)
            })
            .catch(e => {
                console.log(e)
                setError(e)
            })
        },
        validationSchema: Yup.object({
            firstname: Yup.string().min(2, 'Firstname must have 2+ characters').required('Required'),
            lastname: Yup.string().min(2, 'Lastname must have 2+ characters').required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(4, 'Password must have 4+ characters').required('Required'),
            // photo: Yup.string().required('Required')
        })
    })

    const responseGoogle = res => {
        let newUserGoogle = {
            firstname: res.profileObj.givenName,
            lastname: res.profileObj.familyName,
            email: res.profileObj.email,
            photo: res.profileObj.imageUrl,
            password: res.profileObj.googleId,
            google: true
        }

        axios.post('http://localhost:4000/api/signup', newUserGoogle)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.response.token)
            })
            .catch(e => {
                console.log(e)
                setError(e)
            })
    }

    return (
        <>
            <div className='headerLogo'>
                <h1>Ludotech</h1>
            </div>
            <div className='flex'>
            <div className='main-sign'>
                <div>
                    <h2>Sign up</h2>
                    <p>Create an account to buy today</p>
                </div>
                <GoogleLogin
                    clientId="459150618424-3jfl8j0539f5fj34h0e3utqvao05ib8m.apps.googleusercontent.com"
                    buttonText="Create account with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="google"
                    render={renderProps => (
                        <div 
                            className='buttonGoogle'
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                            </svg>
                            <p>Create account with Google</p>
                        </div>
                    )}
                />
                <div className='signupEmailOption'>
                    <div></div>
                    <p>or sign up with email</p>
                    <div></div>
                </div>
                <div className='inputContainer'>
                    <label className='labelSign' htmlFor='firstname'>Firstname</label>
                    <input 
                        name='firstname'
                        type='text'
                        placeholder='Must have 2+ characters'
                        value={formik.values.firstname}
                        onChange={formik.handleChange('firstname')}
                        onBlur={formik.handleBlur('firstname')}
                    />
                    {formik.touched.firstname && formik.errors.firstname && (
                        <p>{formik.errors.firstname}</p>
                    )}
                </div>
                <div className='inputContainer'>
                    <label className='labelSign' htmlFor='lastname'>Lastname</label>
                        <input 
                            name='lastname'
                            type='text'
                            placeholder='Must have 2+ characters'
                            value={formik.values.lastname}
                            onChange={formik.handleChange('lastname')}
                            onBlur={formik.handleBlur('lastname')}
                        />
                        {formik.touched.lastname && formik.errors.lastname && (
                            <p>{formik.errors.lastname}</p>
                        )}
                </div>
                {/* <div className='inputContainer'>
                    <label className='labelSign' htmlFor='photo'>Photo</label>
                    <input 
                        name='photo'
                        placeholder='Must be an url'
                        type='text'
                        value={formik.values.photo}
                        onChange={formik.handleChange('photo')}
                        onBlur={formik.handleBlur('photo')}
                    />
                    {formik.touched.photo && formik.errors.photo && (
                        <p>{formik.errors.photo}</p>
                    )}
                </div> */}
                <div className='inputContainer'>
                    <label className='labelSign' htmlFor='email'>Email</label>
                    <input 
                        placeholder='example@email.com'
                        name='email'
                        type='email'
                        value={formik.values.email}
                        onChange={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p>{formik.errors.email}</p>
                    )}
                </div>
                <div className='inputContainer'>
                    <label className='labelSign' htmlFor='password'>Password</label>
                    <input 
                        placeholder='Must have 4+ characters'
                        name='password'
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p>{formik.errors.password}</p>
                    )}
                </div>
                <div className='flex signupButtonSignup' onClick={formik.handleSubmit}>Sign up</div>
                <p className='adTerms'>By registering you are accepting our Terms and Conditions and our Privacy Policies</p>
                <div className='signupEmailOption'>
                    <div></div>
                    <p>Already have an account?</p>
                    <div></div>
                </div>
                <Link to='/signin'>
                    <div className='flex signinButtonSignup'>Sign In</div>
                </Link>
            </div>
            </div>
        </>
    )
}

export default SignUp