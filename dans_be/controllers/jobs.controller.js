const JobsService = require('../services/job.service');
const ErrorResponse = require('../utils/errorResponse');

class JobsController {
  static async getJobs(req, res, next) {
    try {
      const { description, location, full_time, page } = req.query;
      const jobs = await JobsService.getJobs({ description, location, full_time, page });
      res.status(200).json({
        code: "1",
        msg: "Success Get Jobs",
        data: jobs
      });
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  static async getJobDetail(req, res, next) {
    try {
      const { id } = req.params;
      const job = await JobsService.getJobDetail(id);
      res.status(200).json({
        code: "1",
        msg: "Success Get Job Detail",
        data: job
      });
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }
}

module.exports = JobsController;