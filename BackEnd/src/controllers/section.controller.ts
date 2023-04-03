import { Controller, Get } from '@nestjs/common';
import { SectionService } from '../services/section.service';

@Controller('section')
export class SectionController {
    constructor(private sectionService: SectionService) {
    }

    @Get()
    getAllSectionTrees() {
        return this.sectionService.getAllSectionTrees();
    }
}
