$(document).ready(function() {
    
    //Add task
	$('#add-task').on('submit',function(e){
		addTask(e);
	});
    
    //Edit task
	$('#edit-task').on('submit',function(e){
		updateTask(e);
	});
    
    //Remove task
    $('#task-manager').on('click','#remove-task',function(){
		id = $(this).data('id');
        removeTask(id);
	});
    
    //Clear All tasks
    $('#clear-tasks').on('click',function(){
		clearTasks();
	});
    
    //Display tasks
	displayTasks();
    
    //Function to display tasks
	function displayTasks(){
        
		var taskList = JSON.parse(localStorage.getItem('tasks'));
        
        //Sort tasks before displaying
		if(taskList != null){
			taskList = taskList.sort(sortByTime);
		}
        
        //Check for tasks
		if(localStorage.getItem('tasks') != null){
            
            //Loop through and display
			$.each(taskList, function(key,value){
				$('#task-manager').append('<tr id="'+value.id+'">'+
										  '<td>'+value.task+'</td>'+
										  '<td>'+value.priority+'</td>'+
										  '<td>'+value.date+'</td>'+
										  '<td>'+value.time+'</td>'+
										  '<td><a href="edit.html?id='+value.id+'">Edit</a> | <a href="#" id="remove-task" data-id="'+value.id+'">Remove</a></td></tr>'	

					);
			}) 
		}
	}
    
    //Function to sort tasks
	function sortByTime(a,b){
        
		var aTime = a.time;
		var bTime = b.Time;

		return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
	}
    
    //Function to add tasks
	function addTask(event){
        
		var newDate = new Date();
		var task = $("#task").val();
		var priority = $("#priority").val();
		var date = $("#date").val();
		var time = $("#time").val();
        
        //Make fields mandatory
		if(task == ""){
			alert("Task is required");
		}
		else if(date == ""){
			alert("Date is required");
		}
		else if(time == ""){
			alert("Time is required");
		}
		else if(priority == ""){
			priority = "normal";
		}
		else{
			tasks = JSON.parse(localStorage.getItem('tasks'));
			if(tasks === null){
				tasks = [];
			}
            //Use timestamp as unique id for each task
			id = newDate.getTime();
			var new_task = {
				"id":id,
				"task":task,
				"priority":priority,
				"date":date,
				"time":time
			}

			tasks.push(new_task);
			localStorage.setItem('tasks',JSON.stringify(tasks));
		}
	}
    
    function updateTask(event){
        var id = $("#task_id").val();
        var task = $("#task").val();
		var priority = $("#priority").val();
		var date = $("#date").val();
		var time = $("#time").val();
        
        taskList = JSON.parse(localStorage.getItem('tasks'));
        for(var i=0;i<taskList.length;i++){
            if(taskList[i].id == id ){
               taskList.splice(i,1);
            }
            localStorage.setItem('tasks',JSON.stringify(taskList));
        }
        
        //Validation
		if(task == ""){
			alert("Task is required");
			event.preventDefault();
		}
		else if(date == ""){
			alert("Date is required");
		}
		else if(time == ""){
			alert("Time is required");
		}
		else if(priority == ""){
			priority = "normal";
		}
		else{
			tasks = JSON.parse(localStorage.getItem('tasks'));
			if(tasks === null){
				tasks = [];
			}
            
			var updated_task = {
				"id":id,
				"task":task,
				"priority":priority,
				"date":date,
				"time":time
			}

			tasks.push(updated_task);
			localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
    function removeTask(id){
        if(confirm('Are you sure you want to delete this task')){
            taskList = JSON.parse(localStorage.getItem('tasks'));
            for(var i=0;i<taskList.length;i++){
                if(taskList[i].id == id){
                   taskList.splice(i,1);
                }
                localStorage.setItem('tasks',JSON.stringify(taskList));
            }
            location.reload();
        }
    }
    function clearTasks(){
        taskList = localStorage.getItem('tasks');
        if(taskList != null){
           if(confirm('Do you want to clear all tasks')){
                localStorage.clear();
                location.reload();
            }
        }
    }
});

//Function to get a single task
function getTask(){
       
        var $_GET = getQueryParams(document.location.search);
        var id = $_GET['id'];
        
        var taskList = JSON.parse(localStorage.getItem('tasks'));
        for(var i=0;i<taskList.length;i++){
            if(taskList[i].id == id){
                $('#edit-task #task_id').val(taskList[i].id);
                $('#edit-task #task').val(taskList[i].task);
                $('#edit-task #priority').val(taskList[i].priority);
                $('#edit-task #date').val(taskList[i].date);
                $('#edit-task #time').val(taskList[i].time);
            }
        }
}

//Function to get query parameters
function getQueryParams(qs){
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    
    while(tokens = re.exec(qs)){
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    
    return params;
}

















