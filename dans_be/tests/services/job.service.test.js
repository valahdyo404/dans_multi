const axios = require('axios');
const JobsService = require('../../services/job.service'); // Adjust the path as necessary

jest.mock('axios');

describe('JobsService', () => {
  describe('getJobs', () => {
    it('should return paginated jobs', async () => {
      axios.get.mockResolvedValue({ data: [
        { id: 1, description: 'Software Engineer', company: 'Tech Company', title: 'Engineer', location: 'New York', type: 'Full Time' },
        { id: 2, description: 'Data Scientist', company: 'Data Corp', title: 'Scientist', location: 'San Francisco', type: 'Part Time' },
        { id: 3, description: 'Web Developer', company: 'Web Inc', title: 'Developer', location: 'New York', type: 'Full Time' },
      ] });

      const result = await JobsService.getJobs({ description: '', location: '', full_time: '', page: 1 });
      expect(result).toHaveProperty('totalData');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveLength(3); // Assuming we have 10 jobs in total for this test
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(1); // Adjust based on the number of jobs you mock
    });
  });

  describe('getJobDetail', () => {
    it('should return job details for a valid id', async () => {
      axios.get.mockResolvedValue({ data: [{ id: 1, description: 'Software Engineer' }] });

      const job = await JobsService.getJobDetail(1);
      expect(job).toEqual({ id: 1, description: 'Software Engineer' });
    });
  });
});