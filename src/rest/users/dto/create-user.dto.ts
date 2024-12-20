import { Transform } from 'class-transformer'
import { IsNumberString, IsString } from 'class-validator'
import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class CreateUserPayloadDto {
	@DtoProperty()
	@IsNumberString()
	phoneNumber: string

	@DtoProperty()
	@IsString()
	firstName: string

	@DtoPropertyOptional()
	@IsString()
	lastName: string

	@DtoProperty()
	@IsString()
	login: string

	@DtoPropertyOptional()
	@IsString()
	password: string

	@DtoProperty()
	@IsString()
	deviceName: string
}
