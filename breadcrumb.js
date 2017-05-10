const assert = require('assert');

function generateBC(url, separator) {
  // Check url and filter 'https://' if there exists any
  url = filterHttps(url);

  // Split url string by symbol '/'
  var list = url.split("/");

  // when list length is 1
  if (list.length == 1) {
    formattedFirstPart();
  }

  // always check the last element
  removeLastIfIndexExists(list);

  // always drop the dot sign or pound sign of the last element
  var lastElm = list[list.length -1];
  lastElm = dropChar(lastElm, '.');
  lastElm = dropChar(lastElm, '#');
  lastElm = dropChar(lastElm, '?');
  list[list.length-1]  = lastElm;

  // If list length is less than or equal 3
  if (list.length == 2) {
    return formattedFirstPart() + separator + formattedLastPart(list[1]);
  }

  // If list length is larger than 3, output all parts
  if (list.length >= 3) {
    var middle = separator;
    for (var i = 1; i < list.length-1; i++) {
      middle = middle + formattedMiddlePart(getRelativePath(list, i), list[i]) + separator;
    }
    return formattedFirstPart() + middle + formattedLastPart(list[list.length-1]);
  }
  return;

}

// ----------------------------------- //
//           Helper methods            //
// ----------------------------------- //
function filterHttps(str) {
  if (str.includes('https://')) {
    str = str.substring(9, str.length-1)
  }
  return str;
}
function removeLastIfIndexExists(list) {
  if (list[list.length - 1].includes('index')) {
    list.pop();
  }
}

// The first <a> tag is always same string no matter how many character it contains
function formattedFirstPart() {
  return '<a href="/">HOME</a>';
}

// The middle <a> tag(s) have the related paths..
function formattedMiddlePart(path, str) {
  if (str.includes('-')) {
    str = removeHyphenAndGetStr(str);
  }
  str = dropChar(str, '.');
  str = dropChar(str, '#');
  return '<a href="' + path + '">' + str.toUpperCase() + '</a>';

}

// The <span> tag element is always the last element, ignore character after '.' or '#' signs.
function formattedLastPart(str) {
  if (!str) {
    return "";
  }
  if (str.includes('?')) {
    str = dropChar(str, '?');
  }
  if (str.includes('.')) {
    str = dropChar(str, '.');
  }

  if (str.includes('#')) {
    str = dropChar(str, '#');
  }

  if (str.includes('-')) {
    str = removeHyphenAndGetStr(str);
  }
  return '<span class="active">' + str.toUpperCase() + '</span>';
}

// Remove hyphens if there are any, return formatted string.
// If str length is less than 30, remove hyphens and return uppercased string
// If str length is large than or equal to 30, remove hyphens, ignore specific words, and return uppercased string
function removeHyphenAndGetStr(str) {
  if (str.length < 30 && str.includes('-')) {
    str = str.replace(/-/g, ' ');
  }
  else if (str.length >= 30 && str.includes('-')) {
    var filterArray = ['and', 'the', 'of', 'in', 'from', 'by', 'with', 'or', 'for', 'to', 'at', 'a'];
    var str_list = str.split('-');
    for (var index = 0; index < filterArray.length; index++) {
      removeItemFromList(str_list, filterArray[index]);
    }
    str = '';
    for (i in str_list) {
      str = str.concat(str_list[i].substring(0, 1));
    }
  }
  return str.toUpperCase();
}

function removeItemFromList(array, item) {
  for(var i in array){
       if(array[i]==item){
           array.splice(i,1);
       }
   }
  return array;
}

function dropChar(str , char) {
  if (str.includes(char)) {
    str = str.substring(0, str.indexOf(char));
  }
  return str;
}

function getRelativePath(strList, index) {
  var path = '/' + dropChar(strList[1], '.') + '/';
  for (var i = 2; i <= index; i++) {
    if (strList[i].includes('#')) {
      dropChar(strList[i], '#');
    }
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
