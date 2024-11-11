const axios = require('axios');

class JobsService {
  // Helper function to filter jobs based on the provided parameters
  static filterJobs = (jobs, searchParams) => {
    const { description, location, full_time } = searchParams;

    return jobs.filter(job => {
      let match = true;

      // Filter by description (search term)
      if (description && !(
        job.description.toLowerCase().includes(description.toLowerCase()) ||
        job.company.toLowerCase().includes(description.toLowerCase()) ||
        job.title.toLowerCase().includes(description.toLowerCase())
      )) {
        match = false;
      }

      // Filter by location
      if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
        match = false;
      }

      // Filter by full_time (boolean)
      if (full_time == 'true' && job.type.toLowerCase() !== 'full time') {
        match = false;
      }

      return match;
    });
  };
  static async getJobs({ description, location, full_time, page = 1 }) {

    const response = await axios.get(
      'https://dev6.dansmultipro.com/api/recruitment/positions.json',
    );
    let jobs = response.data;
    jobs = this.filterJobs(jobs, {
      description,
      location,
      full_time,
      page
    });
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedJobs = jobs.slice(startIndex, endIndex);
    
    return {
      totalData: jobs.length,
      data: paginatedJobs,
      currentPage: page,
      totalPages: Math.ceil(jobs.length / pageSize),
    };    
  }

  static async getJobDetail(id) {
    const response = await axios.get(
      `https://dev6.dansmultipro.com/api/recruitment/positions.json`,
    );

    const job = response.data.find(job => job.id === id);

    if (!job) {
      throw new Error('Job not found');
    }
    return job;
  }
}

module.exports = JobsService;