$('#action').click(function(){
	$('iframe').animate({width: 'toggle'});
	$('#place').css('border-left', 'solid 1px black');
	$('#place').css('border-right', 'solid 1px black');
});

$('#action').click(function(){
	$('#scrollet').width(function(){
		if($('#scrollet').width() > 700){
			$('#scrollet').width(330);
			$('#scrollet').height(600);
		}else{
			$('#scrollet').width(1000);
		}
	});
})