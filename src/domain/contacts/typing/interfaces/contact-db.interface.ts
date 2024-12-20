import { Repository } from "typeorm";
import { IContact } from "./contact.interface";

export type IContactRepository = Repository<IContact>