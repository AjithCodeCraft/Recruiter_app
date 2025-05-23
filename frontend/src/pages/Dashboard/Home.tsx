
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5]">
   
        
        <main className="flex-1 p-8 overflow-auto pt-30">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">Welcome User</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolorum aliquam beatae saepe iste sequi maiores natus consequatur quas sapiente!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
           <div className="bg-white rounded-lg shadow p-6 w-[300px] h-[200px] flex flex-col items-center justify-between">
  <h3 className="text-lg font-semibold text-gray-800 text-center">Create a Job post</h3>
  <img 
    src="/create.png" 
    alt="Create icon" 
    className="w-12 h-12 object-contain" 
  />
  <button className="w-[140px] h-[40px] bg-[#005ca9] hover:bg-[#004a8a] text-white rounded-md transition-colors">
    CREATE JOB
  </button>
</div>

            <div className="bg-white rounded-lg shadow p-6 w-[300px] h-[200px] flex flex-col items-center justify-between">
  <h3 className="text-lg font-semibold text-gray-800 text-center">Add your Clients</h3>
  <img 
    src="/invite.png" 
    alt="Create icon" 
    className="w-12 h-12 object-contain" 
  />
  <Link to="/adduser">
    <button className="w-[140px] h-[40px] bg-[#005ca9] hover:bg-[#004a8a] text-white rounded-md transition-colors">
      ADD CLIENTS
    </button>
  </Link>
</div>

            <div className="bg-white rounded-lg shadow p-6 w-[300px] h-[200px] flex flex-col items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 text-center">Manage your Employees</h3>
              <img 
    src="/group.png" 
    alt="group icon" 
    className="w-12 h-12 object-contain" 
  />
              <button className="w-[140px] h-[40px] bg-[#005ca9] hover:bg-[#004a8a] text-white rounded-md transition-colors">
                INVITE USERS
              </button>
            </div>
          </div>
        </main>
      </div>

  )
}

export default Home