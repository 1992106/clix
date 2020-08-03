/* eslint-disable @typescript-eslint/no-explicit-any */

import * as inquirer from 'inquirer';
import path from 'path'

import { isFileNameExcessLimit, isFileNameValid, isFileNameExists } from '../utils/validate'
import config from '../config/config';
import { downloadTemplate, copyTemplate } from '../utils/download'


export default class Init {
  run(): void {
    inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        required: true,
        message: '请输入项目名称',
        validate: (input: string): string | boolean => {
          if (isFileNameExcessLimit(input)) {
            return '项目名称超过限制';
          }
          if (isFileNameValid((input))) {
            return '项目名称不能包含/|<>*?';
          }
          if (isFileNameExists((input))) {
            return '项目名称已存在';
          }
          if (input || input.length) {
            return true;
          }
        }
      },
      {
        type: 'list',
        name: 'projectTemplate',
        required: true,
        message: '请选择项目类型',
        choices: ['angular', 'vue', 'react'],
        default: 'angular'
      },
      {
        type: 'list',
        name: 'projectUrl',
        required: true,
        message: '请选择模板仓库地址',
        choices: ['official', 'private'],
        filter(val: string): string { // 使用filter将括号内容去掉
          return val.replace(/\([^)]*\)/, '');
        },
        default: 'angular',
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'projectMain',
        message: 'Main file (index.js):',
        default: 'index.js'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author (other):',
        default: 'other she'
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC']
      },
    ]).then(answers => {
      this.writing(answers);
    });
  }

  private async writing(answers: any) {
    const { projectTemplate } = answers;
    if (projectTemplate === 'vue') {
      // await  this.createVue();
    }
    else if (projectTemplate === 'angular') {
      await this.createAngular(answers);
    }
    else if (projectTemplate === 'react') {
      //  await this.createReact();
    }
  }

  private async createAngular(answers: any) {
    const { projectName, projectTemplate, projectUrl } = answers;
    const rootDir = path.join(process.cwd(), projectName);
    const templateUrl = config[projectTemplate][projectUrl];
    await downloadTemplate(templateUrl, rootDir);
    if (projectUrl === 'private') {
      const sourcePackage = `${rootDir}/.gitkeep.json`;
      const destinationPackageJSON = `${rootDir}/package.json`;
      await copyTemplate(sourcePackage, destinationPackageJSON, answers);
      const sourceAngular = `${rootDir}/.gitkeep-angular.json`;
      const destinationAngularJSON = `${rootDir}/angular.json`;
      await copyTemplate(sourceAngular, destinationAngularJSON, { projectName });
    }
  }
}