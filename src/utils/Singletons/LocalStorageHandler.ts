const LOCALSTORAGENAME = "SPACEDELIVERY"

export default class LocalStorageHandler{
    static get localStorageData():Record<string, any>{
        let stringdata = localStorage.getItem(LOCALSTORAGENAME)
        return (stringdata)?JSON.parse(stringdata):{}
    }
    static set localStorageData(value:Record<string, any>){
        console.log("saving...", value)
        localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(value))
    }
    static updateData(key:string, settings:Map<string, any>){
        let newSettings = {...this.localStorageData, [key]:Object.fromEntries(settings)}
        this.localStorageData = newSettings
    }
    static getData(key:string):Record<string, any>{
        return (this.localStorageData[key])?this.localStorageData[key]:{}
    }
    static stringify(stats:Map<string, any>){
        console.log(JSON.stringify(stats))
    }
}