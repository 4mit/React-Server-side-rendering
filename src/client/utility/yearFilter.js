export function mapFilter(data,e){
    let mappedFilter = data.map(f=>{
        if(f.year === e){
          f.active = true;
        }else{
          f.active = false;
        }
        return f;
      })

    return mappedFilter;
}

export function launchFilter(data,e){
    let isTrueSet = (e == 'true');
    let launcFilter = data.map(f=>{
        f.active = f.launch == isTrueSet ? true : false
        return f;
      })
    return launcFilter;
}

// Same function seems like repeated but it can be considered for later purpose 
// Where we can have multiple parameters 
export function landFilter(data,e){
    let isTrueSet = (e == 'true');
    let landFilterData = data.map(f=>{
        f.active = f.launch == isTrueSet ? true : false
        return f;
    })
    return landFilterData;
}