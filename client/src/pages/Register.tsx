import { Formik, Form } from "formik";
import { ILogin } from "../interface/interface";
import { useRegisterMutation } from "../redux/services/authApi";
import FormInput from "../components/FormFields/FormInput";
import { Link } from "react-router-dom";
import { RegisterValidationSchema } from "../validators/validators";
import FormRadioGroup from "../components/FormFields/FormRadioGroup";
import { toast } from "react-toastify";

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (values: ILogin & { name: string }) => {
    try {
      await registerUser(values).unwrap();
      toast.success("Registered successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.success("Registration failed!");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Create Account</h2>
        <Formik
          validationSchema={RegisterValidationSchema}
          initialValues={{
            name: "",
            email: "",
            password: "",
            age: "",
            gender: "male",
          }}
          onSubmit={handleSubmit}>
          {({ handleChange, values }) => (
            <Form>
              <FormInput
                name='name'
                labelName='Name'
                placeHolder='Enter your name'
                data-testid='nameInput'
                onChange={handleChange}
                type='text'
                value={values.name}
              />
              <FormInput
                name='email'
                labelName='Email'
                placeHolder='Enter your email'
                data-testid='emailInput'
                onChange={handleChange}
                type='email'
                value={values.email}
              />
              <FormInput
                name='age'
                labelName='Age'
                placeHolder='Enter your age'
                data-testid='ageInput'
                onChange={handleChange}
                type='number'
                value={values.age}
              />
              <FormRadioGroup
                name='gender'
                label='Gender'
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Others", value: "others" },
                ]}
              />
              <FormInput
                name='password'
                labelName='Password'
                placeHolder='Enter your password'
                data-testid='passwordInput'
                onChange={handleChange}
                type='password'
                value={values.password}
              />
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
                data-testid='registerBtn'
                disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </button>
              <p className='text-center text-sm mt-4'>
                Already have an account?{" "}
                <Link
                  to='/login'
                  className='text-blue-600 hover:underline font-medium'>
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
