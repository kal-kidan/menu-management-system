import { Module } from "@nestjs/common";
import { MenuController } from "./menu.controller";
import { MenuException } from "./menu.exception";
import { MenuService } from "./menu.service";


@Module({
    providers: [MenuService, MenuException],
    controllers: [MenuController],
    exports: [MenuService]
})
export class MenuModule { }
