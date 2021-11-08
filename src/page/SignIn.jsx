import { signInWithGoogle } from "../firebase/firebase.util";
import "./SignIn.style.css";
const SignIn = () => {
  return (
    <div id="bg">
      <p className="heading">Link-in-bio</p>
      <div onClick={signInWithGoogle} id="customBtn" class="customGPlusSignIn">
        <span class="icon"></span>
        <span class="buttonText">Google SignIn</span>
      </div>
    </div>
  );
};
export default SignIn;
