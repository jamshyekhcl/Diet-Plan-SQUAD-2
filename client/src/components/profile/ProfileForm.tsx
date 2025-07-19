import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useProfileQuery,
} from "../../redux/services/profileApi";

interface ProfileFormProps {
  userId: string;
  onSuccess?: () => void;
}

interface ProfileFormValues {
  heightCm: number | "";
  weightCm: number | "";
  dietaryPreferences: "veg" | "non-veg" | "";
  allergies: string;
  activityLevel:
    | "Sedentary"
    | "Light"
    | "Moderate"
    | "Active"
    | "Very Active"
    | "";
  healthGoals: "weight_loss" | "weight_gain" | "maintenance" | "";
}

const emptyInitialValues: ProfileFormValues = {
  heightCm: "",
  weightCm: "",
  dietaryPreferences: "",
  allergies: "",
  activityLevel: "",
  healthGoals: "",
};

const validationSchema = Yup.object({
  heightCm: Yup.number().required("Height is required").min(50).max(300),
  weightCm: Yup.number().required("Weight is required").min(10).max(500),
  dietaryPreferences: Yup.string()
    .required("Select dietary preference")
    .oneOf(["veg", "non-veg"]),
  allergies: Yup.string(), // optional
  activityLevel: Yup.string()
    .required("Select activity level")
    .oneOf(["Sedentary", "Light", "Moderate", "Active", "Very Active"]),
  healthGoals: Yup.string()
    .required("Select health goal")
    .oneOf(["weight_loss", "weight_gain", "maintenance"]),
});

const ProfileForm: React.FC<ProfileFormProps> = ({ onSuccess }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const userId = user?.userId;
  const { data: profile, isLoading: loadingProfile } = useProfileQuery(userId);
  const [createProfile] = useCreateProfileMutation();
    const [updateProfile] = useUpdateProfileMutation();

  const [initialValues, setInitialValues] =
    useState<ProfileFormValues>(emptyInitialValues);

  useEffect(() => {
    if (profile) {
      setInitialValues({
        heightCm: profile.heightCm,
        weightCm: profile.weightCm,
        dietaryPreferences: profile.dietaryPreferences,
        allergies: profile.allergies.join(", "),
        activityLevel: profile.activityLevel,
        healthGoals: profile.healthGoals,
      });
    }
  }, [profile]);

  const handleSubmit = async (values: ProfileFormValues) => {
    const payload = {
      ...values,
      userId,
      allergies: values.allergies
        ? values.allergies.split(",").map((a) => a.trim())
        : [],
    };

    try {
      if (profile?._id) {
        await updateProfile({ id: profile._id, data: payload }).unwrap();
        console.log("Profile updated");
      } else {
        await createProfile(payload).unwrap();
        onSuccess();
      }
      onSuccess?.();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  if (loadingProfile) return <p>Loading profile...</p>;

  return (
    <div className='max-w-md mx-auto mt-10 p-6 rounded-md shadow bg-white'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        {profile ? "Update Profile" : "Create Profile"}
      </h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form className='space-y-4'>
          {/* Height */}
          <div>
            <label htmlFor='heightCm'>Height (cm)</label>
            <Field
              name='heightCm'
              type='number'
              className='w-full border px-3 py-2 rounded'
              placeholder='Enter height'
            />
            <ErrorMessage
              name='heightCm'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          {/* Weight */}
          <div>
            <label htmlFor='weightCm'>Weight (kg)</label>
            <Field
              name='weightCm'
              type='number'
              className='w-full border px-3 py-2 rounded'
              placeholder='Enter weight'
            />
            <ErrorMessage
              name='weightCm'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          {/* Dietary Preferences */}
          <div>
            <label>Dietary Preference</label>
            <Field
              name='dietaryPreferences'
              as='select'
              className='w-full border px-3 py-2 rounded'>
              <option value=''>Select</option>
              <option value='veg'>Veg</option>
              <option value='non-veg'>Non-Veg</option>
            </Field>
            <ErrorMessage
              name='dietaryPreferences'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          {/* Allergies */}
          <div>
            <label>Allergies (comma-separated)</label>
            <Field
              name='allergies'
              type='text'
              className='w-full border px-3 py-2 rounded'
              placeholder='e.g. peanuts, gluten'
            />
          </div>

          {/* Activity Level */}
          <div>
            <label>Activity Level</label>
            <Field
              name='activityLevel'
              as='select'
              className='w-full border px-3 py-2 rounded'>
              <option value=''>Select</option>
              <option value='Sedentary'>Sedentary</option>
              <option value='Light'>Light</option>
              <option value='Moderate'>Moderate</option>
              <option value='Active'>Active</option>
              <option value='Very Active'>Very Active</option>
            </Field>
            <ErrorMessage
              name='activityLevel'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          {/* Health Goals */}
          <div>
            <label>Health Goal</label>
            <Field
              name='healthGoals'
              as='select'
              className='w-full border px-3 py-2 rounded'>
              <option value=''>Select</option>
              <option value='weight_loss'>Weight Loss</option>
              <option value='weight_gain'>Weight Gain</option>
              <option value='maintenance'>Maintenance</option>
            </Field>
            <ErrorMessage
              name='healthGoals'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'>
            {profile ? "Update Profile" : "Create Profile"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileForm;
