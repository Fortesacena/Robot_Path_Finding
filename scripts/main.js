(function (definition) {
  /* global module, define */
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = definition();
  } else if (typeof define === "function" && define.amd) {
    define([], definition);
  } else {
    var exports = definition();
    window.astar = exports.astar;
    window.Graph = exports.Graph;
  }
});

function pathTo(node) {
  var curr = node;
  var path = [];
  while (curr.parent) {
    path.unshift(curr);
    curr = curr.parent;
  }
  return path;
}
