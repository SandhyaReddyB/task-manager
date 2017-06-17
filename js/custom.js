$(document).ready(function(){
	$('#add-task').on('submit',function(e){
		addTask(e);
	});
	displayTasks();

	function displayTasks(){
		var taskList = JSON.parse(localStorage.getItem('tasks'));
		if(taskList != null){
			taskList = taskList.sort(sortByTime);
		}
		if(localStorage.getItem('tasks') != null) {
			$.each(taskList, function(key,value){
				$('#task-manager').append('<tr id="'+value.id+'">'+
										  '<td>'+value.task+'</td>'+
										  '<td>'+value.priority+'</td>'+
										  '<td>'+value.date+'</td>'+
										  '<td>'+value.time+'</td>'+
										  '<td><a href="edit-task.html?id='+value.id+'">Edit</a> | <a href="#" id="remove-task">Remove</a></td></tr>'	

					);
			}) 
		}
	}

	function sortByTime(a,b){
		var aTime = a.time;
		var bTime = b.Time;

		return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
	}

	function addTask(event){
		var newDate = new Date();
		var task = $("#task").val();
		var priority = $("#priority").val();
		var date = $("#date").val();
		var time = $("#time").val();

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
			if(tasks == null){
				tasks = [];
			}

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
});