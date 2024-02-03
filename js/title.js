var url_string = window.location.href;
var url = new URL(url_string);
var url_query = url.searchParams.get('param');

if (url_query != 'null') {
    var name_string = decodeURI(atob(url_query));
    document.getElementById("name").innerHTML = name_string + ' ,';
} else {
    document.getElementById("name").innerHTML = '';
}
