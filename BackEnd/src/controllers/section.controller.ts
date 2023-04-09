import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SectionService } from '../services/section.service';

@Controller('section')
export class SectionController {
    constructor(private sectionService: SectionService) {
    }

    @Get()
    getAllSectionTrees() {
        return this.sectionService.getAllSectionTrees();
    }

    @Get(':id')
    getSection(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.sectionService.getSection(id);
    }
}
