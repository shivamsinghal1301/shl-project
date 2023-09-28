import React, { useState, useEffect } from 'react';
import './ProjectData.css'
import Sidebar from './ProjectData.jsx'

function ProjectList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/4ipleox81zfkh')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // When Enter key is pressed, perform the search
      e.preventDefault();
      handleSearch(searchQuery);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      // If the search query is empty or only contains spaces, show all projects
      setFilteredData(data);
      return;
    }
    const criteria = query.toLowerCase().split(' and ');
    const filteredProjects = data.filter((project) => {
      // Check if all criteria match the project's skills
      return criteria.every((criterion) => {
        const [tech, role] = criterion.split(' in ');
  
        // Check if the project matches the current criterion
        const techSkills = project['Project.Technologies'].toLowerCase();
        const frontendSkills = project['Technical_Skillset.Frontend'].toLowerCase();
        const backendSkills = project['Technical_Skillset.Backend'].toLowerCase();
  
        const techMatch = techSkills.includes(tech);
        const roleMatch = (role === 'frontend' && frontendSkills.includes(tech)) ||
          (role === 'backend' && backendSkills.includes(tech));
  
        return techMatch && roleMatch;
      });
    });
  
    // Update the state with the filtered projects and search query
    setFilteredData(filteredProjects);
    setSearchQuery(query);
  };
  

  // Define MainComponent outside of the useEffect
  const MainComponent = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const openSidebar = (project) => {
      setSelectedProject(project);
      setSidebarOpen(true);
    };

    const closeSidebar = () => {
      setSelectedProject(null);
      setSidebarOpen(false);
    };

    return (
      <div className = "fullbody">
      <div className="page-container">
        <div className = 'new-text'>Shl Assessment</div>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            {isSidebarOpen && (
        <div className="sidebar-container">
          <Sidebar project={selectedProject} onClose={closeSidebar} />
        </div>
      )}
      <div className="search-container">
      <input className="search-input"  type="text"  placeholder="Search by criteria..." value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} autoFocus/>
</div>
            <div className='row row-cols-1 row-cols-md-3 row-cols-lg-5 g-2'>
              {filteredData.map((item) => (
                <div
                  className="col mb-2"
                  key={item['Project.Title']}
                >
                  <div
                    className="card border-success h-100"
                    style={{ height: '200px', cursor: 'pointer'}}
                    onClick={() => openSidebar(item)}
                  >
                    <div className="card-body">
                      <h5 className='card-title'>Title:<br/> {item['Project.Title']}</h5>
                      <p className='card-text'>Project Technologies<br/><span className='data-text'> {item['Project.Technologies']}</span></p>
                      <p className='card-text'>Technical_Skills.Frontend<br/><span className='data-text'> {item['Technical_Skillset.Frontend']}</span></p>
                      <p className='card-text'>Technical_Skills.Backend<br/><span className='data-text'> {item['Technical_Skillset.Backend']}</span></p>
                      <p className='card-text'>Technical_Skills.Databases<br/><span className='data-text'> {item['Technical_Skillset.Databases']}</span></p>
                      <p className='card-text'>Technical_Skills.Infrastructre<br/><span className='data-text'> {item['Technical_Skillset.Infrastructre']}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      </div>
    );
  };

  // Render MainComponent
  return <MainComponent />;
}

export default ProjectList;
