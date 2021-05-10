// reference for how to call API: https://stackoverflow.com/questions/24806962/get-an-article-summary-from-the-mediawiki-api

//5-10-21:
// issues:
// - need to figure out how to replace existing results with new one (currently, the first result summary and 2nd result summary are smooshed together")
// - how to be able to scrap wiki pages with spaces (i.e. "John Cena")

baseURL = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles="
document.addEventListener('DOMContentLoaded', bindButton);

function bindButton(){
    document.getElementById('userSubmit').addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    var wikiLink = document.getElementById("wikiLink").value;

//    req.open("GET", baseURL + wikiLink + "&exintro=1&disablepp", true);
    req.open("GET", baseURL + wikiLink, true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            let wikiInfo = JSON.parse(req.responseText);
            let parsedInfo = wikiInfo['query']['pages'];
            let idNum = Object.keys(parsedInfo);
            console.log(parsedInfo[idNum]['extract']);

            scrappedResult = parsedInfo[idNum]['extract'];
            console.log(scrappedResult);

            showResult(scrappedResult);
        }
        else{
            console.log("Error in network request:" + req.statusText)
        }
    });
        req.send(null);
        event.preventDefault();
    });
}

function showResult(summaryInfo){
    // shows result of the Wikipedia scrapping to the webpage
    console.log("reached showResults()");
    let resultsParagraph = document.getElementById("resultsHeader");
    let resultsSummary = document.createTextNode(summaryInfo);

    resultsParagraph.appendChild(resultsSummary);
    resultsHeader.appendChild(resultsParagraph);
    console.log("finished showResults()");

}