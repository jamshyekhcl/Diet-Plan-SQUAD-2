import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the types for form values
interface BMIFormValues {
  height: number | "";
  weight: number | "";
}

// Validation schema using Yup
const validationSchema = Yup.object({
  height: Yup.number()
    .typeError("Height must be a number")
    .required("Height is required")
    .min(50, "Too short")
    .max(300, "Too tall"),
  weight: Yup.number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .min(10, "Too light")
    .max(500, "Too heavy"),
});

const BMICalculator: React.FC = () => {
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBMI(parseFloat(bmiValue.toFixed(2)));

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 24.9) setCategory("Normal weight");
    else if (bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  const initialValues: BMIFormValues = { height: "", weight: "" };

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div className='max-w-md mx-auto mt-10 p-4 border rounded shadow'>
        <h2 className='text-xl font-bold mb-4 text-center'>BMI Calculator</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={({ height, weight }) => {
            calculateBMI(Number(height), Number(weight));
          }}>
          <Form>
            <div className='mb-4'>
              <label htmlFor='height' className='block font-medium mb-1'>
                Height (cm)
              </label>
              <Field
                id='height'
                name='height'
                type='number'
                className='w-full border px-3 py-2 rounded'
                placeholder='Enter height in cm'
              />
              <ErrorMessage
                name='height'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='weight' className='block font-medium mb-1'>
                Weight (kg)
              </label>
              <Field
                id='weight'
                name='weight'
                type='number'
                className='w-full border px-3 py-2 rounded'
                placeholder='Enter weight in kg'
              />
              <ErrorMessage
                name='weight'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'>
              Calculate BMI
            </button>
          </Form>
        </Formik>

        {bmi !== null && (
          <div className='mt-6 text-center'>
            <p className='text-lg font-semibold'>Your BMI: {bmi}</p>
            <p className='text-md text-gray-700'>Category: {category}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
