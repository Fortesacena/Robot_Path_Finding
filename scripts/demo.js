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

   
});