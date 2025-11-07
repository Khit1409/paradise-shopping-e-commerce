import { UIService } from '@/services/ui.service';
import { Controller, Get } from '@nestjs/common';

@Controller('ui')
export class UIController {
  constructor(private readonly uiService: UIService) {}

  @Get()
  async getUI() {
    return await this.uiService.getUI();
  }
}
