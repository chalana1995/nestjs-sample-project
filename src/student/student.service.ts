import { Injectable } from '@nestjs/common';
import { students } from 'src/db';
import { CreateStudentDto, FindStudentResponseDto, StudentResponseDto, UpdateStudentDto } from './dto/student.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {

    private students = students

    getStudents(): FindStudentResponseDto[] {
        return this.students;
    }

    getStudentById(studentId: string): FindStudentResponseDto {
        return this.students.find((student) => {
            student.id === studentId
        })
    }


    createStudent(studentDto: CreateStudentDto): StudentResponseDto {
        let newStudent = {
            id: uuidv4(),
            ...studentDto
        }

        this.students.push(newStudent);

        return newStudent;
    }

    updateStudent(payload: UpdateStudentDto, studentId: string) {

        let updatedStudent: StudentResponseDto;

        const updateStudentList = this.students.map((student) => {
            if (student.id === studentId) {
                updatedStudent = {
                    id: studentId,
                    ...payload
                }
            }
            else return student
        });

        this.students = updateStudentList;

        return updatedStudent

    }


    getStudentByTeachersId(teacherId: string): FindStudentResponseDto[] {
        return this.students.filter((student) => {
            return student.teacher
        })
    }

    updateStudentTeacher(teacherId: string, studentId: string): StudentResponseDto {
        let updatedStudent: StudentResponseDto;

        const updateStudentList = this.students.map((student) => {
            if (student.id === studentId) {
                updatedStudent = {
                    ...student,
                    teacher: teacherId
                }
            }
            else return student
        });

        this.students = updateStudentList;

        return updatedStudent
    }
}
