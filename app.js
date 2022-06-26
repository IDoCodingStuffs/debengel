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

//Try if current window is an entry
if (window.location.href.includes("/entry/")) {
    //Retrieve the entry author
    var authorHref = div.getElementsByClassName("entry-author")[0];
    var author = authorHref.textContent;

    //Check if author is in blocked users list, hide element if it does
    if (susersToHideFromDEBE.has(author)) {
        var content = div.getElementsByClassName("content");
        content.innerHTML = "BU YAZARI ENGELLEMİŞSİNİZ"
    }

    console.log(author);
}
