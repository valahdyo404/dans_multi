const JobsController = require('../../controllers/jobs.controller');
const JobsService = require('../../services/job.service');
const ErrorResponse = require('../../utils/errorResponse');

jest.mock('../../services/job.service');

describe('JobsController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('getJobs', () => {
    it('should return a list of jobs successfully', async () => {
      // Arrange
      req.query = { description: 'developer', location: 'NY', full_time: true, page: 1 };
      const mockJobs = [{ id: 1, title: 'Developer' }];
      JobsService.getJobs.mockResolvedValue(mockJobs);

      // Act
      await JobsController.getJobs(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        code: "1",
        msg: "Success Get Jobs",
        data: mockJobs
      });
    });
  });

  describe('getJobDetail', () => {
    it('should return job details successfully', async () => {
      // Arrange
      req.params.id = '1';
      const mockJob = { id: 1, title: 'Developer' };
      JobsService.getJobDetail.mockResolvedValue(mockJob);

      // Act
      await JobsController.getJobDetail(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        code: "1",
        msg: "Success Get Job Detail",
        data: mockJob
      });
    });
  });
});