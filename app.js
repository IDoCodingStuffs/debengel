susersToHideFromDEBE = new Set();

fetch('https://eksisozluk.com/takip-engellenmis').then(r => r.text()).then(result => {
    console.log("--------------");
    var div = document.createElement('div');
    div.innerHTML = result;
    
    var lists = div.getElementsByClassName("relation-list");

    var blockedList = lists[1].getElementsByTagName("li");
    var blockedThreadsList = lists[2].getElementsByTagName("li");

    for (let e of blockedList) susersToHideFromDEBE.add(e.getElementsByTagName("a")[1].getAttribute("data-nick"));
    for (let e of blockedThreadsList) susersToHideFromDEBE.add(e.getElementsByTagName("a")[1].getAttribute("data-nick"));

    console.log(Array.from(susersToHideFromDEBE)[0]);

    console.log("--------------");
});