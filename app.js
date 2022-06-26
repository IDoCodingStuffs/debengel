susersToHideFromDEBE = new Set();

fetch('https://eksisozluk.com/takip-engellenmis').then(r => r.text()).then(result => {
    //Retrieve follow and block page as text, convert to DOM
    var div = document.createElement('div');
    div.innerHTML = result;
    
    //Follow list, block list and thread block list each live under this class
    var lists = div.getElementsByClassName("relation-list");

    //Second relation-list is the blocked users and third is the thread blocks
    var blockedList = lists[1].getElementsByTagName("li");
    var blockedThreadsList = lists[2].getElementsByTagName("li");

    //Populate the set of blocked users 
    for (let e of blockedList) susersToHideFromDEBE.add(e.getElementsByTagName("a")[1].getAttribute("data-nick"));
    for (let e of blockedThreadsList) susersToHideFromDEBE.add(e.getElementsByTagName("a")[1].getAttribute("data-nick"));
});

//Left bar has the id partial-index
var leftBarList = document.getElementById("partial-index").getElementsByTagName("li");

//Pull each entry, check author, hide if in the blocked list
for (let e of leftBarList) {
    //href of hyperlink is to the entry
    var entryLink = e.getElementsByTagName("a")[0].getAttribute("href");

    fetch(entryLink).then(r => r.text()).then(result => {
        //Retrieve follow and block page as text, convert to DOM
        var div = document.createElement('div');
        div.innerHTML = result;
        
        //Retrieve the entry author
        var authorHref = div.getElementsByClassName("entry-author")[0];
        var author = authorHref.textContent;

        //Check if author is in blocked users list, hide element if it does
        if (susersToHideFromDEBE.has(author)) {
            console.log("Suser gizlendi: " + author);
            e.style.display = "none";
        }
    });
}