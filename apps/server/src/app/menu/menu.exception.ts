import { ExceptionService } from '../../core/exception'
import { HttpStatus, Injectable } from '@nestjs/common'


@Injectable()
export class MenuException {
  constructor(private service: ExceptionService) { }

  notFoundById(id: string) {
    return this.service.throw({
      status: HttpStatus.NOT_FOUND,
      code: 1,
      publicMessage: 'Menu was not found',
      privateMessage: `Menu with id "${id}" was not found.`,
    })
  }
  notRoot(id: string) {
    return this.service.throw({
      status: HttpStatus.BAD_REQUEST,
      code: 2,
      publicMessage: 'Menu was not root',
      privateMessage: `Menu with id "${id}" was not root.`,
    })
  }





}
