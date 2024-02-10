
//Purpose: A panel that appears to warn the user of deleting something (can be anything)
//Params:
//showModal is a bool that controls whether to make the delete panel visible or not
//setShowModal is a bool setter(?) - sets the bool's value
//title & description depend on the context of its usage (i.e are you deleting a game or account ?)
//deleteThis is the callback function that is passed as a param (can be function to delete a game or account)
export default function DeletePanel({ showModal, setShowModal, title, description, deleteThis }) {

    return (
        // this div is to position and add dark background when toggled
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50  ${showModal ? '' : 'hidden'}`}>
            {/* This div is for  */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-1/3 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Delete {title}</h2>
                <label className="block mb-2">
                    <p className='font-bold'>{description}</p>
                </label>
                {/* Save and Cancel */}
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => {setShowModal(false);  deleteThis();}}>
                        Yes
                    </button>
                    <button className="ml-2 bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}