app.controller('HomeController', function ($scope, TodoService) {
    // testing scope...
    var tempGreeting = "Hola!";
    $scope.tempGreeting = tempGreeting;

    $scope.editMode = false;  //Flag for editing. FALSE = not editing
    $scope.currId = ""; //ID of the current ID being edited
    $scope.tName = "";  // Person to do todo
    $scope.tTask = "";  // thing Todo

    $scope.tempArr = []; // holds all todos

    // grab the array...
    //$scope.tempArr = TodoService.getTodos();

    // grab the array via a promise
    function fetchAllTodos() {
        TodoService.getTodos().then(function(data) {
            $scope.tempArr = data;
        }, function () {
            // error...
        })
    };
    fetchAllTodos();

    // Click event for the view
    $scope.doAddBtn = function () {
        console.log($scope.tName, $scope.tTask, $scope.dt, $scope.rate);
        var objToPost = {name: $scope.tName, task: $scope.tTask, date: $scope.dt, rating: $scope.rate}
        TodoService.doAdd(objToPost).then(function (data) {
            // notify user of success
            console.log("Success", data);
            fetchAllTodos();
        }, function () {
            // error
            console.log('doAdd Error');
        })
    };

    //Edit a todo 
    // populate the input fields & components
    $scope.doEdit = function(index) {
        var currObj = $scope.tempArr[index]
        console.log(index, currObj);
        $scope.editMode = true;
        $scope.currId = currObj.Id
        $scope.tName = currObj.name
        $scope.tTask = currObj.task
        $scope.dt = currObj.date
        $scope.rate = currObj.rating
    }
    // save the new edits
    $scope.doSave = function () {
        var objToPost = { name: $scope.tName, task: $scope.tTask, date: $scope.dt, rating: $scope.rate }
        TodoService.doSave(objToPost, $scope.currId).then(function() {
            console.log("UPDATE success");
            $scope.editMode = false;
        }, function() {
            console.log("DANGER WILL ROBERTSON")
        })   
    }
    // Cancel edit
    $scope.doCancelEdit = function () {
        $scope.editMode = false;
        $scope.currId = ""
        $scope.tName = ""
        $scope.tTask = ""
        $scope.dt = $scope.totoday();
        $scope.rate = 7;
    }

    // Delete

    $scope.doDelete = function (index) {
        var currObj = $scope.tempArr[index]
        $scope.currId = $scope.tempArr[index].Id
        console.log($scope.currId, currObj);
        TodoService.doDelete($scope.currId).then(function () {
        fetchAllTodos();
        }, function () {
            console.log('error');
        })
    }

    /* --------------------------------------------------------------- bootstrap UI */

    $scope.greeting = "Hello Todos!";
    //
    // DatePicker stuff...
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.totoday = function () {
        return new Date();
    };



    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    //// rating stuf.


    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
      { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
      { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
      { stateOn: 'glyphicon-heart' },
      { stateOff: 'glyphicon-off' }
    ];


});