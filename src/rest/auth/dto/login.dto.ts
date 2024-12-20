import { IsString } from 'class-validator'
import { DtoProperty } from 'src/shared'

export class AdminLoginPayloadDto {
	@DtoProperty()
	@IsString()
	email: string

	@DtoProperty()
	@IsString()
	password: string

	@DtoProperty()
	@IsString()
	deviceName: string
}
