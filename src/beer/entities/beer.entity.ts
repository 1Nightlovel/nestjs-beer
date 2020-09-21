import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Beer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('nvarchar')  
    name: string;

    @Column('nvarchar') 
    description: string;

    @Column('nvarchar') 
    imageURL: string;

    @Column()
    price: number;

    @Column({ type: "date", default: () => "getdate()"})
    createdAt: Date;


}