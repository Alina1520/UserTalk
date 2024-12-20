export const provideValue = (name:symbol|string,value:any)=>({
provide:name,
useValue:value
})

export const provideClass = (name:symbol|string,value:any)=>({
    provide:name,
    useClass:value
    })