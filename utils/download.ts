/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import * as download from 'download-git-repo';
import * as ora from 'ora';

export async function downloadTemplate(repository: string, destination: string): Promise<void> {
  const spinner = ora('正在初始化项目');
  spinner.start();
  const downloadUrl = repository.replace(/(?<!http:\/?)\//, ':');
  return new Promise((resolve, reject) => {
    download(downloadUrl, destination, { clone: true }, function (error: any) {
      if (error) {
        spinner.fail('初始化项目失败！')
        reject(error);
      } else {
        spinner.succeed('初始化项目完成！')
        resolve();
      }
      spinner.stop();
    })
  })
}

export function copyTemplate(from: string, to: string, context: object): Promise<void> {
  const readable = fs.createReadStream(from);
  const writable = fs.createWriteStream(to);
  return new Promise((resolve, reject) => {
    readable.on('data', (chunk) => {
      let result = chunk.toString();
      Object.keys(context).forEach(item => {
        result = result.replace(new RegExp("<%= " + item + " %>", 'g'), context[item]);
      });
      writable.write(result);
      resolve();
    });
    readable.on('error', (error) => {
      reject(error);
    })
  });
}