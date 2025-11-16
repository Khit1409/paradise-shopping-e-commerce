import { UIService } from '@/services/ui.service';
import { Controller, Get, Param } from '@nestjs/common';
import { UIMapper } from '../mapper/ui.mapper';

@Controller('ui')
export class UIController {
  constructor(private readonly uiService: UIService) {}

  /**
   * get navigation and carousel api
   * @returns
   */
  @Get('')
  async getUI() {
    return await this.uiService.getUI();
  }
  /**
   * get edit product api
   * @param category
   */
  @Get('edit/product/:category')
  async getEditProductApi(@Param('category') category?: string) {
    const result = await this.uiService.getEditProductApi(category);
    const apiFormated = UIMapper.formatEditProductApiResponse(result);
    return apiFormated;
  }
}
