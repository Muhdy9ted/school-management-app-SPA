import { Courses } from './courses.model';

export class StudentProfile {
    public Id: string;
    public firstname: string;
    public lastname: string;
    public matNo: string;
    public level: any;
    public department: string;
    public faculty: string;
    public gender: string;
    public courses: Courses[];
}
