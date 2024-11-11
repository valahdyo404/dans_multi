import React, { useEffect, useState } from 'react';
import JobList from '../components/organisms/JobList';
import { useNavigate } from 'react-router-dom';
import { fetchJobs } from '../config/api';

const GitHubJobs = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isFullTimeOnly, setIsFullTimeOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      const {data : response} = await fetchJobs({page: 1});
      setJobs(response.data.data);
      setTotalPages(response.data.totalPages);
    };
    loadJobs();
  }, []);

  const handleSearch = async () => {
    const {data : response} = await fetchJobs({ description: searchTitle, location: searchLocation, full_time: isFullTimeOnly });
    console.log(response, "data")
    setJobs(response.data.data);
  };

  const handlePagination = async (page) => {
    const {data : response} = await fetchJobs({ description: searchTitle, location: searchLocation, full_time: isFullTimeOnly, page });
    setJobs((prev) => [...prev, ...response.data.data]);
  }

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await handlePagination(currentPage + 1);
    setCurrentPage(prev => prev + 1);
    setIsLoading(false);
  };

  const hasMorePages = currentPage < totalPages;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="space-y-4">
        {/* Search Form */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Filter by title and companies"
              className="w-full px-4 py-2 border rounded-md shadow-sm"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Filter by city, state, zip code or country"
              className="w-full px-4 py-2 border rounded-md shadow-sm"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="fullTime"
              checked={isFullTimeOnly}
              onChange={(e) => setIsFullTimeOnly(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="fullTime">Full Time Only</label>
          </div>
          <button className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors" onClick={() => handleSearch()}>
            Search
          </button>
        </div>

        {/* Job List */}
        <JobList jobs={jobs} onClick={(id) => nav(`/jobs/${id}`)}/>

        {/* Load More Button */}
        {hasMorePages && (
          <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                Loading...
              </div>
            ) : (
              'More Jobs'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GitHubJobs;