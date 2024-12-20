export const getEnv = (name:string,optional=false):string=>{
const value = process.env[name]
if(!optional && (value===undefined || value === null)){
    throw new Error(`Env ${name} does not found`)
}
return value as string
}