"use strict mode";

function ModifyString(x){
    x.forEach(k=>{
        if(k<2)
            console.log("");
        else{
            let y=k.slice(0,2)
            let z=k.slice(-2)  
            console.log(y+z);
        }
    })
}

var strings = ['Spring', "Computer", "IT", "cat"]


ModifyString(strings)