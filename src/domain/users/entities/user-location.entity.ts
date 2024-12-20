import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { IUserLocation } from '../typing'

@Entity('usersLocations')
export class UserLocation implements IUserLocation {
	@PrimaryColumn()
	userId: string

	@Column({ type: 'float', nullable: false })
	lat: number

	@Column({ type: 'float', nullable: false })
	long: number

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
