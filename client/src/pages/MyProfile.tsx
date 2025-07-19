import React, { useState } from "react";
import { useProfileQuery } from "../redux/services/authApi";
import LoadingSpinner from "../components/Spinner";
import Button from "../components/FormFields/ButtonComp";
import Modal from "../components/ModalComp";
import ProfileForm from "../components/profile/ProfileForm";

const MyProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const userId = user?.userId;

  console.log(userId);

  const { data, isLoading, isError, error } = useProfileQuery(userId, {
    skip: !userId,
  });

  if (!userId) return <p>User not logged in.</p>;
  if (isLoading) return <LoadingSpinner />;
  //   if (isError) return <p>Error fetching profile: {(error as any)?.message}</p>;
  if (!data)
    return (
      <div className='flex justify-end px-4 py-2'>
        <Button
          type='button'
          className='sidebar-bg'
          variant='confirm'
          onClick={openModal}>
          {isError ? "Add Metrics" : "Update Metrics"}
        </Button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ProfileForm onSuccess={closeModal} userId={userId} />
        </Modal>
      </div>
    );

  return (
    <>
      <div className='flex justify-end px-4 py-2'>
        <Button
          type='button'
          className='sidebar-bg'
          variant='confirm'
          onClick={openModal}>
          {isError ? "Add Metrics" : "Update Metrics"}
        </Button>
      </div>
      <div className='max-w-md mx-auto mt-10 p-6 rounded-md shadow bg-white'>
        <h2 className='text-2xl font-bold mb-4 text-center'>My Profile</h2>
        <div className='space-y-2 text-gray-700'>
          <p>
            <strong>Height:</strong> {data.heightCm} cm
          </p>
          <p>
            <strong>Weight:</strong> {data.weightCm} kg
          </p>
          <p>
            <strong>Dietary Preferences:</strong> {data.dietaryPreferences}
          </p>
          <p>
            <strong>Allergies:</strong>{" "}
            {data.allergies.length ? data.allergies.join(", ") : "None"}
          </p>
          <p>
            <strong>Activity Level:</strong> {data.activityLevel}
          </p>
          <p>
            <strong>Health Goals:</strong> {data.healthGoals.replace("_", " ")}
          </p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ProfileForm onSubmit={closeModal} />
      </Modal>
    </>
  );
};

export default MyProfile;
