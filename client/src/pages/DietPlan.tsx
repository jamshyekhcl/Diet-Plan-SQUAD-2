import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../components/FormFields/ButtonComp";
// import { dietPlanValidation } from "./validationSchema";
// import type { DietPlanFormValues } from "./types";
// import { useCreateDietPlanMutation } from "../redux/api/dietPlanApi";

const DietPlanForm: React.FC = () => {
  // const [createDietPlan] = useCreateDietPlanMutation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // const initialValues: DietPlanFormValues = {
  //   daily: "",
  //   weekly: "",
  //   startDate: "",
  //   endDate: "",
  // };

  // const handleSubmit = async (values: DietPlanFormValues) => {
  //   if (!user?.userId) return alert("User not found!");

  //   const payload = {
  //     userId: user.userId,
  //     daily: values.daily.split(",").map((id) => id.trim()),
  //     weekly: values.weekly.split(",").map((id) => id.trim()),
  //     startDate: values.startDate,
  //     endDate: values.endDate,
  //   };

  //   try {
  //     const result = await createDietPlan(payload).unwrap();
  //     console.log("Diet plan created:", result);
  //     alert("Diet Plan Created!");
  //   } catch (err) {
  //     console.error("Failed to create diet plan", err);
  //   }
  // };

  return (
    <>
      <div className='flex justify-end px-4 py-2'>
        <Button
          type='button'
          className='sidebar-bg'
          variant='confirm'
          // onClick={openModal}
        >
          Add Diet Plan
        </Button>
      </div>
      <div className='flex justify-center items-center h-screen'>
        <div className='w-full max-w-md bg-white p-6 rounded-xl shadow-md'>
          <Formik
            // initialValues={initialValues}
            // validationSchema={dietPlanValidation}
            // onSubmit={handleSubmit}
            >
            <Form>
              <label htmlFor='daily'>Daily Meal IDs (comma separated)</label>
              <Field name='daily' type='text' className='input' />
              <ErrorMessage name='daily' component='div' className='error' />

              <label htmlFor='weekly'>Weekly Meal IDs (comma separated)</label>
              <Field name='weekly' type='text' className='input' />
              <ErrorMessage name='weekly' component='div' className='error' />

              <label htmlFor='startDate'>Start Date</label>
              <Field name='startDate' type='date' className='input' />
              <ErrorMessage
                name='startDate'
                component='div'
                className='error'
              />

              <label htmlFor='endDate'>End Date</label>
              <Field name='endDate' type='date' className='input' />
              <ErrorMessage name='endDate' component='div' className='error' />

              <button
                type='submit'
                className='mt-4 w-full bg-blue-600 text-white py-2 rounded-md'>
                Create Plan
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default DietPlanForm;
