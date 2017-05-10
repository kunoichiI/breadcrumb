const assert = require('assert');
const firstPart = '<a href="/">HOME</a>';

function generateBC(url, separator) {
  url = url.replace(/(http(s?))\:\/\//, '')
            .replace(/\/(index).*/, '')
            .replace(/\.(php).*/, '')
            .replace(/\.(asp).*/, '')
            .replace(/\.(htm).*/, '')
            .replace(/\?.*/, '')
            .replace(/\#.*/, '') // Remove all unnecessary parts of original string
  var list = url.split('/');
  if (list.length == 1) {
    return firstPart;
  } else if (list.length == 2) {
    return firstPart + separator + formattedLastPart(list[1]);
  } else if (list.length >= 3) {
    var middle = separator;
    for (var i = 1; i < list.length-1; i++) {
      middle = middle + formattedMiddlePart(getRelativePath(list, i), list[i]) + separator;
    }
    return firstPart + middle + formattedLastPart(list[list.length-1]);
  }
}
// Helper functions
function formattedMiddlePart(path, str) {
  str = removeHyphen(str);
  return '<a href="' + path + '">' + str + '</a>';
}

function formattedLastPart(str) {
  str = removeHyphen(str);
  return '<span class="active">' + str + '</span>';
}

function removeHyphen(str) {
  if (str.length < 30) {
    str = str.replace(/-/g, ' ').toUpperCase();
  } else {
    str = str.replace(/-(and|the|of|in|from|by|with|or|for|to|at|a)/ig, '')
              .match(/\b\w/g).join('')
              .toUpperCase();
  }
  return str;
}

function getRelativePath(strList, index) {
  var path = '/' + strList[1] + '/';
  for (var i = 2; i <= index; i++) {
    path = path + strList[i] + '/';
  }
  return path;
}

assert.equal(generateBC("mysite.com/pictures/holidays.html", " : "),
    '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>');

assert.equal(generateBC("www.codewars.com/users/GiacomoSorbi", " / "),
    '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>');

assert.equal(generateBC("www.microsoft.com/important/confidential/docs/index.htm#top", " * ") ,
    '<a href="/">HOME</a> * <a href="/important/">IMPORTANT</a> * <a href="/important/confidential/">CONFIDENTIAL</a> * <span class="active">DOCS</span>');

assert.equal(generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp", " > "),
    '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>')

assert.equal(generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") ,
    '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>');

assert.equal(generateBC('https://twitter.de/the-biotechnology-paper-of/issues#team', ' >>> ') ,
    '<a href="/">HOME</a> >>> <a href="/the-biotechnology-paper-of/">THE BIOTECHNOLOGY PAPER OF</a> >>> <span class="active">ISSUES</span>');

assert.equal(generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") ,
    '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>');

assert.equal(generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") ,
    '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>');

assert.equal(generateBC('codewars.com/giacomo-sorbi.php#conclusion', ' # ') ,
    '<a href="/">HOME</a> # <span class="active">GIACOMO SORBI</span>');

assert.equal(generateBC("www.codewars.com/users/GiacomoSorbi", " / ") ,
    '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>' );

assert.equal(generateBC("www.microsoft.com/docs/index.htm", " * ") ,
    '<a href="/">HOME</a> * <span class="active">DOCS</span>');

assert.equal(generateBC('https://codewars.com/issues/index.html', ' : ') ,
    '<a href="/">HOME</a> : <span class="active">ISSUES</span>');

assert.equal(generateBC('https://twitter.de/research-with-and-a-surfer-of-bladder-immunity-diplomatic', ' . ') ,
    '<a href="/">HOME</a> . <span class="active">RSBID</span>' );

assert.equal(generateBC('https://www.pippi.pi/secret-page.html?source=utm_pippi', ' * '),
    '<a href="/">HOME</a> * <span class="active">SECRET PAGE</span>');

assert.equal(generateBC('https://www.facebook.fr/research-with-bioengineering-or-skin', ' ; ') ,
    '<a href="/">HOME</a> ; <span class="active">RBS</span>');

assert.equal(generateBC('google.ca/to-or-surfer-with-of-eurasian?source=utm_pippi', ' > ') ,
    '<a href="/">HOME</a> > <span class="active">TO OR SURFER WITH OF EURASIAN</span>');
