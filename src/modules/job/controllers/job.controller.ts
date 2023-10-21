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
import { JobApplicationService } from "../services/job-application.service";

@Controller("job")
export class JobController {
  constructor(
    private readonly jobCreationService: JobCreationService,
    private readonly jobQueryService: JobQueryService,
    private readonly jobApplicantService: JobApplicationService
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
    const { jobs, total } = await this.jobQueryService.getAllJobs(query);
    return { ok: true, total, jobs };
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
    const updatedJob = await this.jobApplicantService.applyJob(requestingUser, job);
    delete updatedJob.applicants;
    return { ok: true, job: updatedJob };
  }

  @Get("/applicants/:code")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.COMPANY, UserRole.ADMIN]))
  async getApplicants(@Req() req: Request, @Param("code") code: string) {
    const { job } = await this.jobQueryService.getJobDataByCode(code, true);
    return { ok: true, applicants: job.applicants };
  }
}
