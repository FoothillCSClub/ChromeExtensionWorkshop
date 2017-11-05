// This is an unsafe solution for text replacement, but is used here for brevity.
document.body.innerHTML = document.body.innerHTML.replace(/Apple/g, "Orange").replace(/apple/gi, "orange");
