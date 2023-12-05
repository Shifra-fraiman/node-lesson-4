    async function adressIpOfComputer(){
        try{
            const response= await fetch("https://api.myip.com");
            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`)
            }
            const IPcomputer= await response.json();
            console.log(`The computer ip: ${IPcomputer.ip}`);
        }catch(error){
            console.error(error);
        }
    }
    adressIpOfComputer();
    
async function getWords(){
    try {
        const fsPromises= require('fs').promises;
        const response=await fsPromises.readFile('./words.json');
        const words= await JSON.parse(response);
        descriptionOfWords(words);

    } catch (error) {
        console.error(`error: ${error}`);
    }

}
getWords();

async function descriptionOfWords(words){
    try {
        let results= await Promise.all(words.map(word=> fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)));
        if(!results.ok){
            throw new Error(`HTTP error: ${response.status}`)
        }
        let informationOfWords= await Promise.all(results.map(resultWord=> resultWord.json()));
        informationOfWords.forEach(informationOfWord=>{
            let definitionWord= informationOfWord[0].meanings[0].definitions[0].definition;
            console.log(`The definition of ${informationOfWord[0].word} is: ${definitionWord}`);
        })
    } catch (error) {
        console.log(`${error}`);
    }
}



