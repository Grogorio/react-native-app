import {
  SignUpStep1,
  SignUpStep2,
  SignUpStep3,
  SignUpConfirmation,
  SignUpAccountVerificationStep,
  SignUpNewConfirmationCode
} from '../screens'

export const signUpRoutes = {
  signUpStep1: {
    screen: SignUpStep1,
    routeName: 'signUpStep1'
  },
  signUpStep2: {
    screen: SignUpStep2,
    routeName: 'signUpStep2'
  },
  signUpStep3: {
    screen: SignUpStep3,
    routeName: 'signUpStep3'
  },
  signUpConfirmation: {
    screen: SignUpConfirmation,
    routeName: 'signUpConfirmation'
  },
  signUpAccountVerificationStep: {
    screen: SignUpAccountVerificationStep,
    routeName: 'signUpAccountVerificationStep'
  },
  signUpNewConfirmationCode: {
    screen: SignUpNewConfirmationCode,
    routeName: 'signUpNewConfirmationCode'
  }
}

export interface ISignUpAccountVerificationStepScreenParams {
  isSignUpInProcess: boolean
}
