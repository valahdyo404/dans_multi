import React from 'react';

const JobList = ({ jobs, onClick }) => {

  return (
    <div className="bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold p-6 border-b">Job List</h2>
    <div className="divide-y">
      {jobs.map((job) => (
        <li
          key={job.id}
          className="block p-6 hover:bg-gray-50 transition-colors"
          onClick={() => onClick(job?.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-blue-600">
                {job.title}
              </h3>
              <div className="text-gray-600 mt-1">
                {job.company} – 
                <span className="text-green-600 ml-1">{job.type}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-700">{job.location}</div>
              <div className="text-gray-500 text-sm mt-1">
                {job.postedAt}
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  </div>
  );
};

export default JobList;