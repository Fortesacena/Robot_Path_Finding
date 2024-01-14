var WALL = 0,
    performance = window.performance;

$(function() {

    var $grid = $("#search_grid"),
        $selectWallFrequency = $("#selectWallFrequency"),
        $selectGridSize = $("#selectGridSize"),
        $checkDebug = $("#checkDebug"),
        $searchDiagonal = $("#searchDiagonal"),
        $checkClosest = $("#checkClosest");

    var opts = {
        wallFrequency: $selectWallFrequency.val(),
        gridSize: $selectGridSize.val(),
        debug: $checkDebug.is("checked"),
        diagonal: $searchDiagonal.is("checked"),
        closest: $checkClosest.is("checked")
    };

    var grid = new GraphSearch($grid, opts, astar.search);

    $("#btnGenerate").click(function() {
        grid.initialize();
    });

    $selectGridSize.change(function() {
        grid.setOption({gridSize: $(this).val()});
        grid.initialize();
    });
    $checkDebug.change(function() {
        grid.setOption({debug: $(this).is(":checked")});
    });

    $searchDiagonal.change(function() {
        var val = $(this).is(":checked");
        grid.setOption({diagonal: val});
        grid.graph.diagonal = val;
    });

   
});

var css = { start: "start", finish: "finish", wall: "wall", active: "active" };

function GraphSearch($graph, options, implementation) {
    this.$graph = $graph;
    this.search = implementation;
    this.opts = $.extend({wallFrequency:0.1, debug:true, gridSize:10}, options);
    this.initialize();
}
GraphSearch.prototype.setOption = function(opt) {
    this.opts = $.extend(this.opts, opt);
    this.drawDebugInfo();
};

GraphSearch.prototype.initialize = function() {
    this.grid = [];
    var self = this,
        nodes = [],
        $graph = this.$graph;

    $graph.empty();

    var cellWidth = ($graph.width()/this.opts.gridSize)-2,  // -2 for border
        cellHeight = ($graph.height()/this.opts.gridSize)-2,
        $cellTemplate = $("<span />").addClass("grid_item").width(cellWidth).height(cellHeight),
        startSet = false;
        
        for(var x = 0; x < this.opts.gridSize; x++) {
            var $row = $("<div class='clear' />"),
                nodeRow = [],
                gridRow = [];

            for(var y = 0; y < this.opts.gridSize; y++) {
                var id = "cell_"+x+"_"+y,
                    $cell = $cellTemplate.clone();
                $cell.attr("id", id).attr("x", x).attr("y", y);
                $row.append($cell);
                gridRow.push($cell);

                var isWall = Math.floor(Math.random()*(1/self.opts.wallFrequency));
                if(isWall === 0) {
                    nodeRow.push(WALL);
                    $cell.addClass(css.wall);
                }
                else  {
                    var cell_weight = ($("#generateWeights").prop("checked") ? (Math.floor(Math.random() * 3)) * 2 + 1 : 1);
                    nodeRow.push(cell_weight);
                    $cell.addClass('weight' + cell_weight);
                    if ($("#displayWeights").prop("checked")) {
                        $cell.html(cell_weight);
                    }
                    if (!startSet) {
                        $cell.addClass(css.start);
                        startSet = true;
                    }
                }
            }
            $graph.append($row);

            this.grid.push(gridRow);
            nodes.push(nodeRow);
        }
};