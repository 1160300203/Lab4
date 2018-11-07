   
$(document).ready(function () {
    showAll();
	
    $("#button_all").click(showAll);
	
    $("#fM").click(function () {
        let major = $("#major");
        $.get("queryEntries.php",{"show":"major", "value":major.val()},
            function (data, status) {
                if(status=="success"){
                    $("#entries").html(data);
                }
                major.val('');
            });
        $("#button_all").show();
    });

    $("#fC").click(function () {
        let course = $("#course");
        $.get("queryEntries.php",{"show":"course", "value":course.val()},
            function (data, status) {
                if(status=="success"){
                    $("#entries").html(data);
                }
                course.val("");
            });
        $("#button_all").show();
    });
	
	$("#add").click(function () {
		let newname = $("#newname").val();
		let newmajor = $("#newmajor").val();
		let newcourse = $("#newcourse").val();
		let newcoursedate = $("#newcoursedate").val();
		let newattendance = $("#newattendance").val();
		if(newname != "" && newmajor != "" && newcourse != "" && (/(\d{4})-(\d{2})-(\d{2})/.test(newcoursedate)) && (newattendance=="PRESENT"||newattendance=="ABSENT")){
            $.get("queryEntries.php",{'show':'add','value':newname,'value2':newmajor,'value3':newcourse,'value4':newcoursedate,'value5':newattendance},
                function (data, status) {
                    if(status=='success'){
                        $("#entries").html(data);
                    }
                    $("#newname").val("");
                    $("#newmajor").val("");
                    $("#newcourse").val("");
                    $("#newcoursedate").val("");
                    $("#newattendance").val("");
                });
		}else{
		    alert("Check your input date format " +
                "(YYYY-MM-DD), Attendance record (PRESENT/ABSENT) and whether all fields are " +
                "filled.");
        }
	});
	
	
    $("#orderByName").click(function () { //order by name
		
		$entrydivs=$("#entries").children();
		
		$entrydivs.sort(function(a,b){
			var an = $($(a).find('h3')[0]).text();
			var bn = $($(b).find('h3')[0]).text();

			if(an > bn) {
				return 1;
			}
			if(an < bn) {
				return -1;
			}
			return 0;
		});

		$entrydivs.detach().appendTo($("#entries"));
    });

    $("#orderByCourse").click(function () { //order by course
        $entrydivs=$("#entries").children();

        $entrydivs.sort(function(a,b){
            var an = $($(a).find('h5')[0]).text();
            var bn = $($(b).find('h5')[0]).text();

            if(an > bn) {
                return 1;
            }
            if(an < bn) {
                return -1;
            }
            return 0;
        });

        $entrydivs.detach().appendTo($("#entries"));
	});

});

function showAll() {
	$.get("queryEntries.php", {"show":"all"}, function (data, status) {
        if (status == "success") {
        	$("#entries").html(data);
        }
    });
	$("#button_all").hide();
}

function changeState(elem) {
    var itemID = $(elem).parent().attr("id");

    if ($(elem).html() === 'PRESENT') {
        newvalue = 'ABSENT';
    } else {
        newvalue = 'PRESENT';
    }
	$(elem).load("updateState.php",{'newValue':newvalue,'id':itemID}, function (data, status) {
        if(status=="success"){
            $(elem).text(data);
        }
    });
}

