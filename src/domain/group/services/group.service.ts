import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { GROUP_REPOSITORY, ICreateGroupPayload, IGroup, IGroupsRepository, IGroupsService, IUpdateGroupPayload } from "../typing";
import * as _ from "lodash"

@Injectable()
export class GroupService implements IGroupsService{
    constructor(
		@Inject(GROUP_REPOSITORY)
		private readonly groupsRepository: IGroupsRepository,
	) {}

	public async create(payload: ICreateGroupPayload): Promise<IGroup> {
		const entity = this.groupsRepository.create({
			name: payload.name,
			avatarUrl: payload.avatarUrl,
			chatId: payload.chatId,
			styleSettings: {
				fontFamily: payload.fontFamily,
				color: payload.fontColor,
			},
		})
		const group = await this.groupsRepository.save(entity)

		return group
	}

	public async update(id: string, payload: IUpdateGroupPayload): Promise<IGroup> {
		const exist = await this.groupsRepository.findOneBy({ id })
		if (!exist) throw new NotFoundException()

		const dataToSave: Partial<IGroup> = _.omit(payload, ['fontColor', 'fontFamily'])

		if (payload.fontColor || payload.fontFamily)
			dataToSave.styleSettings = {
				fontFamily: _.defaultTo(payload.fontFamily, exist.styleSettings.fontFamily),
				color: _.defaultTo(payload.fontColor, exist.styleSettings.color),
			}

		const updatedGroup = this.groupsRepository.merge(
			exist,
			_.omitBy(_.omit(dataToSave), _.isNil),
		)
		await this.groupsRepository.update(id, dataToSave)

		return updatedGroup
	}

	public async delete(id: string): Promise<void> {
		const exist = await this.groupsRepository.findOneBy({ id })
		if (!exist) return
		await this.groupsRepository.delete({ id })
	}
}