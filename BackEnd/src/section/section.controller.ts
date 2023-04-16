import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
    constructor(private sectionService: SectionService) {
    }

    @Get()
    all() {
        return this.sectionService.all();
    }

    @Get(':id')
    section(@Param('id', ParseIntPipe) id: number) {
        return this.sectionService.get(id);
    }
}
