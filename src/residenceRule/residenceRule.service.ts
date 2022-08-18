import { Injectable } from '@nestjs/common';
import {
  ResidenceRule,
  FilterResidenceRuleDto,
  CreateResidenceRuleDto,
  UpdateResidenceRuleDto,
} from './dto';

@Injectable()
export class ResidenceRuleService {
  async create(
    createResidenceRuleDto: CreateResidenceRuleDto,
  ): Promise<ResidenceRule> {
    const residenceRule = {
      residence_id: createResidenceRuleDto.residence_id,
      rule_body: createResidenceRuleDto.rule_body,
    };
    return residenceRule;
  }

  async findAll(
    filterResidenceRuleDto: FilterResidenceRuleDto,
  ): Promise<ResidenceRule[]> {
    const residenceRule = [
      {
        residence_id: 1,
        rule_body: 'خونه را کثیف نکنین لطفا',
      },
    ];
    return residenceRule;
  }

  async findOne(id: number): Promise<ResidenceRule> {
    const residenceRule = {
      residence_id: id,
      rule_body: 'خونه را کثیف نکنین لطفا',
    };
    return residenceRule;
  }

  async update(
    id: number,
    updateResidenceRuleDto: UpdateResidenceRuleDto,
  ): Promise<ResidenceRule> {
    const residenceRule = {
      residence_id: id,
      rule_body: updateResidenceRuleDto.rule_body || 'خونه را کثیف نکنین لطفا',
    };
    return residenceRule;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
