import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";

// Blank user image
const photo =
  "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1682183923~exp=1682184523~hmac=7b363a7e2f6de1b8296fe22ea6eaceb24356ca04809ff110b92ad504d0c651d3";

const Register = () => {
  // Context API
  const { createUser, profileUpdate, verificationEmail, loading, setLoading } =
    useContext(AuthContext);

  // State
  const [err, setErr] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isNotChecked, setIsNotChecked] = useState(true);

  // Email Validation with Regex
  // uncontrolled component => controlled component
  const emailValidation = (event) => {
    const email = event.target.value;

    if (email.length > 0) {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        setErr("Please provide a valid email");
        return;
      } else {
        setErr("");
        return;
      }
    } else {
      setErr("");
      return;
    }
  };

  // Password Validation with Regex
  // uncontrolled component => controlled component
  const passwordValidation = (event) => {
    const password = event.target.value;

    if (password.length > 0) {
      if (password.length < 6) {
        setErr("Your password should be at least 6 character long.");
        return;
      } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
        setErr("Your password should be at least one special character.");
        return;
      } else if (!/(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
        setErr(
          "Your password should be at least one upper and lower case letter."
        );
        return;
      } else if (!/(?=.*\d)/.test(password)) {
        setErr("Your password should be at least one digit.");
        return;
      } else {
        setErr("");
        return;
      }
    } else {
      setErr("");
      return;
    }
  };

  // Registration with email password
  const submitRegHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // Create user
    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setErr("");
        event.target.reset();
        setIsNotChecked(true);

        toast("Successfully registered!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Update user profile
        profileUpdate(name, photo)
          .then(() => {
            console.log(user);
          })
          .catch((error) => {
            console.log(error);
          });

        // Send verification email
        verificationEmail().then(() => {
          console.log("Verification email sent");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errForMsg = errorMessage.split(":");
        setErr(errForMsg[1]);
        console.log(`Error Message: ${errorMessage}`);
        setLoading(false);
      });
  };

  return (
    <section className="my-12">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          {/* Error message */}
          {err ? (
            <div className="bg-white alert alert-error">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-500">{err}</span>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* Registration form */}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form
              onSubmit={submitRegHandler}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your name:
                </label>
                <input
                  type="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email:
                </label>
                <input
                  onChange={emailValidation}
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="bg-gray-50 flex border border-gray-300 rounded-lg">
                  <input
                    onChange={passwordValidation}
                    type={isVisible ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  <button
                    type="button"
                    className="px-2"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <FaEye className="h-5 w-5" />
                    ) : (
                      <FaEyeSlash className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    onClick={() => setIsNotChecked(!isNotChecked)}
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <Link className="font-medium text-primary-600 hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>

              {/* Toggle create and loading button */}
              {loading ? (
                <div className="flex justify-center items-center w-full text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </div>
              ) : (
                <button
                  disabled={isNotChecked}
                  type="submit"
                  className="w-full text-white bg-blue-700 disabled:bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
              )}

              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
