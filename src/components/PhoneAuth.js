import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase-config';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = async () => {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved');
      },
    }, auth);

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      setIsCodeSent(true);
    } catch (error) {
      console.error('Error sending code: ', error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      console.log('Phone number verified successfully!');
    } catch (error) {
      console.error('Error verifying code: ', error.message);
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      {!isCodeSent ? (
        <>
          <input
            type="tel"
            placeholder="Phone number (+1234567890)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleSendCode}>Send Verification Code</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </>
      )}
    </div>
  );
};

export default PhoneAuth;
