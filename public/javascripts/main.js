	$(document).ready(function(){
		$('.delete-user').on('click',function(){
			var userId=$(this).attr('data-attr-id');
			$.ajax({
				url:"/users",
				type:"DELETE",
				data:{
					userid:userId
				}				
			}).done(function(){
				$('#user-'+userId).remove();
			});
		});

		$('#edit-form').on('submit',function(e){
			e.preventDefault();
			var userId=$(this).attr('data-attr-id'),
				name =$('#name').val(),
				jobtitle =$('#jobtitle').val(),
				email =$('#email').val(),
				empcode =$('#empcode').val(),
				phone =$('#phone').val();
			$.ajax({
				url:"/users",
				type:"PUT",
				data:{
					"userid":userId,
					"name":name,
					"email":email,
					"title":jobtitle,
					"empcode":empcode,
					"phone":phone
				}				
			}).done(function(){
				window.location.href="/users";
			});
		});

		$('#add-form').on('submit',function(e){
			e.preventDefault();
			var name =$('#name').val(),
				jobtitle =$('#jobtitle').val(),
				email =$('#email').val(),
				empcode =$('#empcode').val(),
				phone =$('#phone').val();
			$.ajax({
				url:"/users",
				type:"POST",
				data:{
					"name":name,
					"email":email,
					"title":jobtitle,
					"empcode":empcode,
					"phone":phone
				}				
			}).done(function(){
				window.location.href="/users";
			});
		});
	});