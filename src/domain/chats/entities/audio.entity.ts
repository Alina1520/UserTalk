import { Column, Entity, PrimaryColumn } from 'typeorm'
import { IAudio } from '../typing'

@Entity('audios')
export class Audio implements IAudio {
	@PrimaryColumn()
	audioMessageId: string

	@Column()
	duration: number

	@Column()
	minDecibel: number

	@Column()
	maxDecibel: number

	@Column({
		type: 'json',
	})
	meteringConfig: number[]
}
