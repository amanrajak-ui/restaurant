//count number of instances a char is present in a string
function countSubString(string, subString){
    let countString = 0;
    for(let strIndex=0; strIndex < string.length; strIndex++){
        if(string[strIndex] == subString)
        countString++;
    }
    return countString;
}


///find all the indexes where substring is present
function findSubstringIndexes(string, substring){
    let substringIndexes = [];
    for(let strIndex=0; strIndex< string.length; strIndex++){
        if(string[strIndex] == substring)
            substringIndexes.push(strIndex)
    }
    return substringIndexes
}

//Parse integers in a string and seperate them
function parseIntegersFromString(string, seperator){
    let parsedIntegers = [];
    let splittedString = string.split(seperator)
    splittedString.forEach((unparsedInt)=>{
        parsedIntegers.push(parseInt(unparsedInt))
    })
    return parsedIntegers;
}


function randomNumberGenerator(lowestNumber, highestNumber){
    return Math.floor(Math.random() * (highestNumber - lowestNumber)) + lowestNumber
}



function load_overlaySpinner(element = 'body', duration = 1000, arguments = {}){
    $(element).LoadingOverlay("show", arguments);
    if((duration != false)){
        setTimeout(function(){
            stop_overlaySpinner(element)
        }, duration);
    }
}

function stop_overlaySpinner(element){
    $(element).LoadingOverlay("hide", true);
}


