import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RoleGuard } from "@/common/guards/role.guard";
import { UserRole } from "@/modules/user/enums";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CreateJobDto } from "../dtos/create-job.dto";
import { JobCreationService } from "../services/job-creation.service";
import { User } from "@/modules/user/user.entity";
import { JobQueryService } from "../services/job-query.service";
import { JobsListOptionsDto } from "../dtos/list-jobs.dto";
import { JobApplyService } from "../services/job-apply.service";
import { JobApplicantsService } from "@/modules/job_applicants/services/job-applicants.service";
import ApiError from "@/common/error";

@Controller("job")
export class JobController {
  constructor(
    private readonly jobCreationService: JobCreationService,
    private readonly jobQueryService: JobQueryService,
    private readonly jobApplyService: JobApplyService,
    private readonly jobApplicantsService: JobApplicantsService
  ) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.COMPANY, UserRole.ADMIN]))
  async postJob(@Req() req: Request, @Body() createJobDto: CreateJobDto) {
    const requestingUser = req.user as User;
    const job = await this.jobCreationService.createJob(requestingUser, createJobDto);
    return { ok: true, job };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getJobs(@Req() req: Request, @Query() query: JobsListOptionsDto) {
    const requestingUser = req.user as User;
    const { jobs, total } = await this.jobQueryService.getAllJobs(requestingUser, query);
    return { ok: true, total, jobs };
  }

  @Get("/my-applications")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  async getMyApplications(@Req() req: Request) {
    const requestingUser = req.user as User;
    const jobs = await this.jobApplicantsService.getStudentAppliedJobs(requestingUser);
    return { ok: true, jobs };
  }

  @Get(":code")
  @UseGuards(JwtAuthGuard)
  async findJobByCode(@Req() req: Request, @Param("code") code: string) {
    const { job } = await this.jobQueryService.getJobDataByCode(code);
    return { ok: true, job };
  }

  @Patch(":code")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.COMPANY, UserRole.ADMIN]))
  async updateJob(@Req() req: Request, @Param("code") code: string, @Body() createJobDto: CreateJobDto) {
    const { job } = await this.jobQueryService.getJobDataByCode(code);
    const updatedJob = await this.jobCreationService.updateJob(job, createJobDto);
    return { ok: true, job: updatedJob };
  }

  @Delete(":code")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.COMPANY, UserRole.ADMIN]))
  async deleteJob(@Req() req: Request, @Param("code") code: string) {
    const requestingUser = req.user as User;
    const { job } = await this.jobQueryService.getJobDataByCode(code);
    await this.jobCreationService.deleteJob(requestingUser, job);
    return { ok: true };
  }

  @Post("/apply/:code")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  async applyJob(@Req() req: Request, @Param("code") code: string) {
    const requestingUser = req.user as User;
    const { job } = await this.jobQueryService.getJobDataByCode(code, true);
    return this.jobApplyService.applyJob(requestingUser, job);
  }

  @Get("/applicants/:code")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.COMPANY, UserRole.ADMIN]))
  async getApplicants(@Req() req: Request, @Param("code") code: string) {
    const { job } = await this.jobQueryService.getJobDataByCode(code, true);
    return { ok: true, applicants: job.applicants };
  }

  @Post("/applicants/:code/sorted-students")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.COMPANY, UserRole.ADMIN]))
  async sortStudents(@Req() req: Request, @Param("code") code: string, @Body() payload: { studentIds: string[] }) {
    const { job } = await this.jobQueryService.getJobDataByCode(code, true);
    const sortedStudents = await this.jobApplyService.sendSortedStudents(job, payload.studentIds);
    return { ok: true, applicants: sortedStudents };
  }
}
