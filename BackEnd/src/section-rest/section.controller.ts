import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionDetails, SectionTree } from './dto';

@Controller('section')
export class SectionController {
    constructor(private sectionService: SectionService) {
    }

    @Get()
    all(): Promise<SectionTree[]> {
        return this.sectionService.all();
    }

    @Get(':id')
    section(@Param('id', ParseIntPipe) id: number): Promise<SectionDetails> {
        return this.sectionService.get(id);
    }
}
