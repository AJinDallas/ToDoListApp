app.factory('TodoService', function($http, $q){
    // List of todos
    var todos = [];

    // add a placeholder todo
    //todos.push({ name: "Rick", task: "wash car", timeAdded: "3/4/2015" });
    //todos.push({ name: "Mike", task: "wash dishes", timeAdded: "3/5/2015" });

    // GET - retrieve all the todos
    function getTodos() {
        var def = $q.defer(); // set up the PROMISE
        $http({
            url: 'https://315demo.firebaseio.com/todos/.json',
            method: 'GET'
        }).success(function (data) {
            // take action with the data
            //console.log(data);
            if (data == 'null') {
                todos.push({ name: "Nothing to see here" });
            } else {
                todos = [];
                for (var i in data) {
                    data[i].Id = i;
                    console.log(i, data[i])
                    todos.push(data[i]);
                }
                console.log("xdata", data.length, data)
                console.log("xtodos", todos.length)
            }
            def.resolve(todos) // resolve the PROMISE
        }).error(function () {
            console.log("GET error");
            def.reject(); // reject the PROMISE
        });
        return def.promise; // return the PROMISE
    };

    // POST - AJAX function
    function addTodos(newTodo) {
        var def = $q.defer();  // POST promise
        $http({
            url: 'https://315demo.firebaseio.com/todos/.json',  // URL of our database
            method: 'POST',  // CRUD method
            data: newTodo  // passes the object to the database - 'data' is a keyword
        }).success(function (data) {  //  POST is successful
            console.log('POST Success', data);

            def.resolve(data);  // resolve the POST PROMISE
        }).error(function () {  //  POST errors
            console.log('POST Error');
            def.reject();  // reject the POST PROMISE
        });
        return def.promise;  // returns the promise for the POST function
    }
    //'UPDATE' method

    function saveTodo(objToSave, currId) {
        var def = $q.defer(); //Update promise
        $http({
            url:'https://315demo.firebaseio.com/todos/' + currId + '/.json',// tweak this later
            method: 'PATCH',
            data: objToSave
        }).success(function (data) {
            def.resolve(data);
            console.log("Success", data)
        }).error(function () {
            def.reject();
            console.log("Error")
        })
        return def.promise;
    }

    // Delete

    function deleteTodo(currId) {
        var def = $q.defer();
        $http({
            url: 'https://315demo.firebaseio.com/todos/' + currId + '/.json',// tweak this later
            method: 'DELETE',
        }).success(function (data) {
            console.log('Delete Success', data);
            def.resolve(data);
        }).error(function () {
            console.log('Error');
            def.reject();
        })
        return def.promise;
    }


    // PUBLIC methods
   return {
        getTodos: getTodos,
        doAdd: addTodos,
        doSave: saveTodo,
        doDelete: deleteTodo
    }



});