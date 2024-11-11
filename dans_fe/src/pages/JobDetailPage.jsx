import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchJobDetail } from '../config/api';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const nav = useNavigate()

  useEffect(() => {
    const loadJobDetail = async () => {
      const {data:response} = await fetchJobDetail(id);
      setJob(response.data);
    };
    loadJobDetail();
  }, [id]);

  return (
    (job ? <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1" onClick={() => nav("/jobs")}>
          <span>←</span>
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Job Header */}
            <div className="mb-8">
              <div className="text-gray-600 mb-2">{job.type} / {job.location}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
            </div>

            {/* Company Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">{job.company}</h2>
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            {/* Company Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold mb-4 flex justify-between items-center">
                {job.company}
                <span className="text-blue-600 text-sm">1 other job</span>
              </h3>
              
              {job.company_logo && (
                <div className="mb-4">
                  <img 
                    src={job.company_logo} 
                    alt={`${job.company} logo`}
                    className="max-w-full h-auto"
                  />
                </div>
              )}
              
              {job.company_url && (
                <a 
                  href={job.company_url}
                  className="text-blue-600 hover:text-blue-800 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {job.company_url.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>

            {/* How to Apply Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">How to apply</h3>
              <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: job.how_to_apply }} />
            </div>
          </div>
        </div>
      </main>
    </div> : "Loading...")
  );
};

export default JobDetailPage;