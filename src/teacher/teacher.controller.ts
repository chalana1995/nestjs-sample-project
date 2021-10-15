import { Controller, Get, Param, Put } from "@nestjs/common";
import { FindTeacherResponseDto } from "./dto/teacher.dto";
import { TeacherService } from "./teacher.service";


@Controller('teacher')
export class TeacherController {

    constructor(private teacherService: TeacherService) { }

    @Get()
    getAllTeachers(): FindTeacherResponseDto[] {
        return this.teacherService.getAllTeachers();
    }

    @Get('/:teacherId')
    getTeacherById(@Param('teacherId') teacherId: string): FindTeacherResponseDto {
        return this.teacherService.getTeacherById(teacherId);
    }


}