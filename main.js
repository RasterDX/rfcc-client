window.onload = function() {
    fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        this.console.log(data);
        document.getElementById('sidebar').innerHTML = data;
    })
    .catch(error => console.error(error));
    fetch('header.html')
    .then(response => response.text())
    .then(data => {
        this.console.log(data);
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error(error));
}