import { Repository } from 'typeorm'
import { IGroup } from './group.interface'

export type IGroupsRepository = Repository<IGroup>
