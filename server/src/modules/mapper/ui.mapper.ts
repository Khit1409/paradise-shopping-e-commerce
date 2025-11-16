import { EditProductResponseDto } from '../domain/dto/ui/ui-response.dto';

export class UIMapper {
  static formatEditProductApiResponse(res: EditProductResponseDto[]) {
    return res.map((api) => ({
      id: api._id,
      category: api.category,
      brands: api.brands,
      attributes: api.attributes,
    }));
  }
}
