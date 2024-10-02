function LetraRandom() {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
    const indice = Math.floor(Math.random() * abc.length);
    return abc[indice];
}

function NumRandom() {
    return Math.floor(Math.random() * 9);
}


export const generateToken = ()=> {
    let token = '';
    let i = 0;
        while(i<6){ 
            if(i%2 == 0){
             token+=LetraRandom()
            }else{
            token+=NumRandom()
            }
            i++;
    }
    return token 
} 