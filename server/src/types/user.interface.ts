import { JwtAuthGuardUserDataType } from './auth.interface';

/**
 * type of user information when finished authentication
 */
export interface AuthentionUserRespone extends JwtAuthGuardUserDataType {
  other_phone: string[];
  other_email: string[];
  other_address: string[];
}
