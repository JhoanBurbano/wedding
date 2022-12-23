
export function classNames(clases:Record<string, boolean>) {
    const classes: Array<string> = []
    for(let name in clases){
        if(clases[name]){
            classes.push(name)
        }
    }
    return classes.join(' ');
}