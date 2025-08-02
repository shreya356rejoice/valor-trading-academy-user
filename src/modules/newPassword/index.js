import React from 'react'
import styles from './newPassword.module.scss';
import Logo from '@/components/logo';
import Button from '@/components/button';
import Input from '@/components/input';
const EyeIcon = '/assets/icons/eye.svg';

export default function NewPassword() {
  return (
     <div className={styles.login}>
      <div className={styles.box}>
        <div className={styles.logoCenter}>
            <Logo/>
        </div>
        <div className={styles.title}>
            <h2>
              Set new password
            </h2>
            <p>
                Lorem Ipsum is simply dummy text of the printing industry.
            </p>
        </div>
        <div className={styles.leftRightAlignment}>
             <div className={styles.spacing}>
         <Input label='New Password' placeholder='**************' icon={EyeIcon}/>
       </div>
         <Input label='Confirm Password' placeholder='**************' />
      
         <div className={styles.btnwidth}>
            <Button text="Set new password" fill />
         </div>
        </div>
        
      </div>
    </div>
  )
}
