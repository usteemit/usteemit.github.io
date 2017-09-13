function d(index) {
	$( "#newTextBox"+index ).remove();
}

$(document).ready(function(){
	var counter = 1;
	
    $("#util_transfer").click(function(){
		from = $('#from').val();
		to0  = $('#txtTo0').val();
        key  = $('#key').val();
        memo = $('#memo').val();
        amount = $('#amount').val();
		
		if(from=='') {
			alert('Required field cannot be empty: from');
			return;
		}
		if(to0=='') {
			alert('Required field cannot be empty: to');
			return;
		}
		if(key=='') {
			alert('Required field cannot be empty: key');
			return;
		}
		if(memo=='') {
			alert('Required field cannot be empty: memo');
			return;
		}
		if(amount=='') {
			alert('Required field cannot be empty: amount');
			return;
		}
		if(isNaN(parseFloat(amount))){
			alert('Amount field must be number.');
			return;
		}
		
		for(var i=0; i<=counter; i++) {
	 	  if ($('#txtTo' + i).length > 0) {
			to   = $('#txtTo' + i).val();
			
			if(to!='') {
		  	  try {
				  $("#messagebox").html('<i style="font-color: blue;"  class="fa fa-refresh fa-spin fa-2x fa-fw"></i>');
				  
				  steem.broadcast.transfer(key, from, to, amount, memo, function(err, result) {
					console.log(err, result);
				  });
				  
				  $("#messagebox").html('<i style="font-color: green;"  class="fa fa-check fa-2x"></i>');
			  }catch(err) {
				  $("#messagebox").html('<i style="font-color: red;" class="fa fa-exclamation-triangle fa-2x"></i>');
			  }
			}
		  }
		}
		
        
    });
	
	$("#add_account").click(function(){
        var newTextBoxDiv = $(document.createElement('div'))
	                                  .addClass('col-md-8 inputGroupContainer');
		newTextBoxDiv.attr('id', 'newTextBox' + counter);
		
        newTextBoxDiv.html(
		  '<div class="input-group">' + 
          '    <span style="visibility: hidden;" class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>' + 
          '    <input  name="to" placeholder="to" class="form-control"  type="text" id="txtTo'+counter+'">' + 
		  '  <span style="position:relative; top:0px; font-size: 1.5em;" ' + 
		  '        title="Remove account" id="del_account'+counter+'" onclick="d(' + counter + ')">' + 
		  '		&nbsp;&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true"></i>' + 
		  '	  </span>	' + 
          '  </div>' 
		)
		newTextBoxDiv.appendTo("#to-group");

	    counter++;
    });
});
