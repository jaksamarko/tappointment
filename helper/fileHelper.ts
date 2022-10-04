import * as fs from 'fs';
import { FileInterface } from '../interfaces/fileInterface';

export class FileHelper {
	private readonly fileName: string;

	constructor(fName: string) {
		this.fileName = fName;
	}

	writeFile(data: FileInterface) {
		try {
			fs.writeFileSync(this.fileName, JSON.stringify(data));
		} catch (e) {
			console.error(e);
		}
	}

	readFile(): FileInterface {
		try {
			return JSON.parse(fs.readFileSync(this.fileName).toString()) as FileInterface;
		} catch (e) {
			console.error(e);
		}
		return { num: 0 };
	}
}
