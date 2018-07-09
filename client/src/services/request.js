const Request = function(url) {
  this.url = url;
};

Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function() {
    if(this.status !== 200) {
      return;
    }

    const responseBody = JSON.parse(this.responseText);

    callback(responseBody);
  });
  request.send();
};

Request.prototype.post = function(callback, payload) {
  const request = new XMLHttpRequest();
  request.open("POST", this.url);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function() {
    if(this.status !== 201) {
      return;
    }

    // const responseBody = JSON.parse(this.responseText);

    // callback(responseBody);
    callback(this.status);
  });
  request.send(JSON.stringify(payload));
};

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open("DELETE", this.url);
  request.addEventListener("load", function() {
    if(this.status !== 204) {
      return;
    }

    callback();
  });
  request.send();
};

module.exports = Request;
