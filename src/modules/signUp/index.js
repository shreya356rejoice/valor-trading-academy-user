import React from 'react'
import styles from './signUp.module.scss';
import Logo from '@/components/logo';
import Input from '@/components/input';
import Authentication from '@/components/authentication';
import Button from '@/components/button';
const EyeIcon = '/assets/icons/eye.svg';

export default function SignUp() {
  return (
   <div className={styles.signUp}>
      <div className={styles.box}>
        <div className={styles.logoCenter}>
            <Logo/>
        </div>
        <div className={styles.title}>
            <h2>
              Create Your Free Account
            </h2>
            <p>
               Start learning from industry experts and grow your financial skills.
            </p>
        </div>
     <div className={styles.leftRightalignment}>
          <div className={styles.spacing}>
         <Input label='Full Name' placeholder='Enter your name' />
       </div>
       <div className={styles.spacing}>
         <Input label='Email Address' placeholder='Enter your email' />
       </div>
       <div className={styles.spacing}>
         <Input label='Password' placeholder='Enter your password' />
       </div>
         <Input label='Confirm Password' placeholder='Enter your confirm password' icon={EyeIcon}/>
         <div className={styles.forgotPassword}>
            <a>Forgot password?</a>
         </div> 
         <div className={styles.btnwidth}>
            <Button text="Sign Up" fill />
         </div>
         <Authentication/>
         <div className={styles.lastContent}>
            <p>
              Already have an account? <a>Sign In</a>
            </p>
         </div>
     </div>
      </div>
    </div>
  )
}
