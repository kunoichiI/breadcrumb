Description:

As breadcrumb menùs are quite popular today, I won't digress much on explaining them, leaving the wiki link doing the dirty work in my place.

What might not be so trivial is to get a decent breadcrumb from your current url: for this kata your purpose is to create a function that takes a url, strips the first part (labeling it always HOME) and then builds it making each element but the last a <a> element linking to the relevant path; last has to be a <span> element getting the active class.

All elements need to be turned into uppercase and separated by a separator, given as the second parameter of the function; the last element can terminate in some common extension like .html, .htm, .php or .asp; if the name of the last element is index.something, you treat it as if it wasn't there, sending users automatically to the upper folder.

A few examples can be more helpful than thousands of explanations, so here you have them:

    generateBC("mysite.com/pictures/holidays.html", " : ") == '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>'
    generateBC("www.codewars.com/users/GiacomoSorbi", " / ") == '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>'
    generateBC("www.microsoft.com/docs/index.htm", " * ") == '<a href="/">HOME</a> * <span class="active">DOCS</span>'

Seems easy enough? Well, probably not, but we have now a last extra rule: if one element (other than the root/home) is longer than 30 characters, you have to shorten it, acronymizing it (i.e.: taking just the initials of every word); url will be always given in the format this-is-an-element-of-the-url and you should ignore words in this array while acronymizing: ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]; url composed of more words separated by -, but equal or less than 30 characters long, needs to be just uppercased with hyphens replaced by spaces.

Ignore anchors (www.url.com#lameAnchorExample) and parameters (www.url.com?codewars=rocks&pippi=rocksToo) when present.

Examples:

    generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") == '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
    generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") == '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'

You will always be provided valid url to webpages in common formats, so you probably shouldn't bother validating them.

If you like to test yourself with actual work/interview related kata, please also consider this one about building a string filter for Angular.js

Special thanks to the colleague that, seeing my code and commenting that I worked on that as if it was I was on CodeWars, made me realize that it could be indeed a good idea for a kata :)


    function generateBC(url, separator) {
      //your code here
    }

    generateBC("mysite.com/pictures/holidays.html", " : ") === '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>'
    generateBC("www.codewars.com/users/GiacomoSorbi", " / ") === '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>'
    generateBC("www.microsoft.com/important/confidential/docs/index.htm#top", " * ") === '<a href="/">HOME</a> * <a href="/important/">IMPORTANT</a> * <a href="/important/confidential/">CONFIDENTIAL</a> * <span class="active">DOCS</span>'
    generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp", " > ") === '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
    generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") === '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'
    generateBC('https://twitter.de/the-biotechnology-paper-of/issues#team', ' >>> ') === '<a href="/">HOME</a> >>> <a href="/the-biotechnology-paper-of/">THE BIOTECHNOLOGY PAPER OF</a> >>> <span class="active">ISSUES</span>' 
    generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") === '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
    generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") === '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'
    generateBC('codewars.com/giacomo-sorbi.php#conclusion', ' # ') === '<a href="/">HOME</a> # <span class="active">GIACOMO SORBI</span>'
    generateBC("www.codewars.com/users/GiacomoSorbi", " / ") === '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>' 
    generateBC("www.microsoft.com/docs/index.htm", " * ") === '<a href="/">HOME</a> * <span class="active">DOCS</span>' 
    generateBC('https://codewars.com/issues/index.html', ' : ') === '<a href="/">HOME</a> : <span class="active">ISSUES</span>' 
    generateBC('https://twitter.de/research-with-and-a-surfer-of-bladder-immunity-diplomatic', ' . ') === '<a href="/">HOME</a> . <span class="active">RSBID</span>' 
    generateBC('https://www.pippi.pi/secret-page.html?source=utm_pippi', ' * ') === '<a href="/">HOME</a> * <span class="active">SECRET PAGE</span>'
    generateBC('https://www.facebook.fr/research-with-bioengineering-or-skin', ' ; ') === '<a href="/">HOME</a> ; <span class="active">RBS</span>'
    generateBC('google.ca/to-or-surfer-with-of-eurasian?source=utm_pippi', ' > ') === '<a href="/">HOME</a> > <span class="active">TO OR SURFER WITH OF EURASIAN</span>'
