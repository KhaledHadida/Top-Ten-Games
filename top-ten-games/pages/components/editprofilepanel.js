import { useState } from 'react';
import { updateUserProfile } from '../api/userapi';
import DeletePanel from './deletepanel';
import { deleteUser } from '../api/userapi';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/authcontext';
//The images from 1.png to 9.png
const imageFiles = Array.from({ length: 9 }, (_, index) => `${index + 1}.png`);

export default function EditProfilePanel({ showModal, setShowModal, currentName, currentDescription, currentProfilePic, refresh }) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const [profilePic, setProfilePic] = useState(currentProfilePic);
  const [error, setError] = useState("");

  //Logout functionality
  const { logout } = useAuth();


  //For delete panel
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

    //Delete game
    const handleDeleteUser = () => {
      deleteUser()
        .then(() => {

          //"log" them out
          logout();
          //redirect him to homepage
          router.push('./home'); // Replace '/mygames' with the actual path of your "mygames" page
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    };

  //Submit 
  //Just quick string validation because it's all in frontend
  const handleSubmit = async () => {
    //Verify name is not empty
    if (name == undefined || name.trim() == '') {
      setError("Name must not be empty!");
      return;
    }
    //call the api to save
    await updateUserProfile(description, profilePic, name).then(() => refresh());
    setShowModal(false);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50  ${showModal ? '' : 'hidden'}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <label className="block mb-2">
          <p className='font-bold'>Name:</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md p-1 w-full" />
        </label>
        <label className="block mb-2">
          <p className='font-bold'>Description:</p>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-md p-1 w-full" />
        </label>

        <label className="block mb-2 font-bold">
          Profile Picture:
        </label>
        {/* Here we have the profile pictures */}
        <div className='flex flex-wrap -mb-4'>
          {imageFiles.map((filename) => (
            <img
              key={filename}
              className={`mb-5 border-4 ${profilePic === filename ? 'border-blue-500' : ''}`}
              style={{ width: 100, height: 100, textAlign: "center" }}
              src={`/Images/Profiles/${filename}`}
              alt={`Profile ${filename}`}
              onClick={() => setProfilePic(filename)}
            />))}
        </div>
        {error && <p className={`text-red-500 font-bold`}>{error}</p>}
        {/* Credit to rightful owners for the profile pictures */}
        <div className='text-xs'>
          <a href="https://www.freepik.com">Designed by rawpixel.com / Freepik</a>
        </div>
        {/* Delete account */}
        <label className='block mb-2 font-bold my-5'>
          If you'd like to delete your account permanently
        </label>
        <p className='italic text-xs text-gray-500 -mt-3 mb-4'>(This cannot be REVERSED!)</p>
        <button className="bg-red-500 hover:bg-red-600  text-white px-6 py-3 rounded-md" onClick={() => openDeleteModal()}>
          DELETE MY ACCOUNT
        </button>
        {/* Save and Cancel */}
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md" onClick={() => handleSubmit()}>
            Save
          </button>
          <button className="ml-2  bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
      {/* Delete button panel */}
      {isDeleteModalOpen && (
        <DeletePanel
          showModal={isDeleteModalOpen}
          setShowModal={setIsDeleteModalOpen}
          title={"User"}
          description={"Are you sure you want to delete your account?"}
          deleteThis={() => handleDeleteUser()}
        />
      )}
    </div>
  );
};


