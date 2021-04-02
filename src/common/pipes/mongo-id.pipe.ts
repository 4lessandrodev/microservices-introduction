import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isValidMongoId = isValidObjectId(value);
    if (!isValidMongoId) {
      throw new BadRequestException(`${metadata.type} is not an ObjectId`);
    }
    return value;
  }
}
