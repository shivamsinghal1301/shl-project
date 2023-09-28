// Sidebar.js

import React from 'react';

const Sidebar = ({ project, onClose }) => {
  return (
    <div className="sidebar">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <h3>{project['Project.Title']}</h3>
      <hr></hr>
      <p><i className='fas fa-code project-icon'></i> <span className='text-head'>Title</span><br />{project['Project.Title']}</p>
      <p><span className='text-head'> Project Technologies</span><br />{project['Project.Technologies']}</p>
      <p><span className='text-head'>Technical_Skillset.Frontend</span><br/> {project['Technical_Skillset.Frontend']}</p>
      <p><span className='text-head'>Technical_Skillset.Backend</span><br/> {project['Technical_Skillset.Backend']}</p>
      <p><span className='text-head'>Technical_Skillset.Databases</span><br/> {project['Technical_Skillset.Databases']}</p>
      <p><span className='text-head'>Technical_Skillset.Infrastructure</span><br/> {project['Technical_Skillset.Infrastructre']}</p>
      <p><span className='text-head'>Other Info</span><br/> {project['Other_Information.Availability']}</p>
    </div>
  );
};

export default Sidebar;
