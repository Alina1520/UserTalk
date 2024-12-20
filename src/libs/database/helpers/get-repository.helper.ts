import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

export const provideEntity = (name:symbol|string,entity:EntityTarget<ObjectLiteral>) =>({
provide:name,
useFactory:(connection:DataSource)=>connection.getRepository(entity),
inject:[DataSource]
})