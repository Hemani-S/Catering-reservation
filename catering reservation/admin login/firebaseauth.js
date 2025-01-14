import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
    import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAagncTGiejR-miu5-SfJMlhGBo-RyAvXM",
      authDomain: "login-2edf3.firebaseapp.com",
      projectId: "login-2edf3",
      storageBucket: "login-2edf3.firebasestorage.app",
      messagingSenderId: "401299673676",
      appId: "1:401299673676:web:356ce3e411583730a5dae9"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    // Function to show messages
    function showMessage(message, divId) {
      var messageDiv = document.getElementById(divId);
      messageDiv.style.display = "block";
      messageDiv.innerHTML = message;
      messageDiv.style.opacity = 1;
      setTimeout(function() {
        messageDiv.style.opacity = 0;
      }, 5000);
    }
    
    // Sign Up functionality
    const signUp = document.getElementById('submitSignUp');
    signUp.addEventListener('click', (event) => {
      event.preventDefault();
      
      const email = document.getElementById('rEmail').value;
      const password = document.getElementById('rPassword').value;
      const firstName = document.getElementById('fName').value;
      const lastName = document.getElementById('lName').value;
    
      const auth = getAuth();
      const db = getFirestore();
    
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName
          };
          
          showMessage('Account Created Successfully', 'signUpMessage');
    
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData)
            .then(() => {
              window.location.href = 'index.html';
            })
            .catch((error) => {
              console.error("Error writing document:", error);
              showMessage('Unable to save user data', 'signUpMessage');
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            showMessage('Email Address Already Exists!!!', 'signUpMessage');
          } else {
            showMessage('Unable to create User', 'signUpMessage');
          }
        });
    });
    
    // Sign In functionality
    const signIn = document.getElementById('submitSignIn');
    signIn.addEventListener('click', (event) => {
      event.preventDefault();
    
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const auth = getAuth();
    
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          showMessage('Login is successful', 'signInMessage');
          const user = userCredential.user;
          localStorage.setItem('loggedInUserId', user.uid);
          window.location.href = '../User login/order-summary.html';
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password') {
            showMessage('Incorrect Email or Password', 'signInMessage');
          } else {
            showMessage('Account does not Exist', 'signInMessage');
          }
        });
    });
    