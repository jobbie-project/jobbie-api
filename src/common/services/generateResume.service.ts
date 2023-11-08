import { User } from "@/modules/user/user.entity";
import * as fs from "fs";
import { castUserToResumed } from "../utils/cast-user-to-resumed";
import { Injectable } from "@nestjs/common";
import { Resume } from "../utils/resumed.interface";
import { AttachmentSendgrid } from "@/modules/job/services/mail/job-mail.service";

const { spawn } = require("child_process");

@Injectable()
export class GenerateStudentResumeService {
  async generateResume(jobCode: string, userData: User): Promise<AttachmentSendgrid> {
    const userResume = castUserToResumed(userData);
    const filename = `${userData.name}-${userData.student.id}`;
    const filePath = this.writeStudentResumeInJson(jobCode, filename, userResume);
    const outFilePath = this.runResumedCommand(jobCode, filename, filePath);
    const dataRead = fs.readFileSync(outFilePath, { encoding: "utf-8" }).toString();
    return {
      content: dataRead,
      filename: outFilePath,
      type: "application/html",
      disposition: "AttachmentSendgrid",
    };
  }

  writeStudentResumeInJson(jobCode: string, filename: string, studentResume: Resume) {
    const dir = `${__dirname}/resumes-json-job-${jobCode}`;
    const filePath = dir + `/${filename}.json`;

    const dirExists = fs.existsSync(dir);
    const fileExists = fs.existsSync(filePath);

    !dirExists && fs.mkdirSync(dir);
    fileExists && fs.rmSync(filePath);

    const data = JSON.stringify(studentResume, null, 2);
    fs.writeFileSync(filePath, data);
    return filePath;
  }

  runResumedCommand(jobCode: string, filename: string, filePath: string) {
    const dir = `${__dirname}/resumes-html-job-${jobCode}`;
    const outFilePath = dir + `/${filename}.html`;

    const dirExists = fs.existsSync(dir);
    const fileExists = fs.existsSync(outFilePath);

    !dirExists && fs.mkdirSync(dir);
    fileExists && fs.rmSync(outFilePath);
    let childProcessSuccess = true;

    const childProcess = spawn("resumed", ["render", filePath, "--theme", "jsonresume-theme-onepage", "-o", outFilePath]);
    childProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      childProcessSuccess = false;
    });

    return childProcessSuccess ? outFilePath : null;
  }

  removeFolder(jobCode: string) {
    const dir = `${__dirname}/resumes-html-job-${jobCode}`;
    const dirExists = fs.existsSync(dir);
    dirExists && fs.rmSync(dir, { recursive: true, force: true });
  }
}
