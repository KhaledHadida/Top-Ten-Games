export default function UserEntry() {
    return (
        <div className="flex justify-center">
            {/* Image for user */}
            <button className='flex outline outline-2 outline-offset-2 ' style={{ width: '75%', padding: '15px' }}>
                <img className="rounded-full mr-5" style={{ width: 250, height: 250 }} src="../images/witcher.jpg" alt="image description"></img>
                <h1 className="font-semibold">John R</h1>
            </button>
        </div>
    )
}