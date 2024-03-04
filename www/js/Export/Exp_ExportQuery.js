//document.addEventListener("deviceready", GetCommodityList, false);

var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");

var PDAServiceURL = window.localStorage.getItem("PDAServiceURL");

// var PDAServiceURL = "https://galaxytest.kalelogistics.com/GalaxyINTMABBHHTWS/CMS_WS_PDA.asmx/";

$(function () {

    if (window.localStorage.getItem("RoleExpExportsQuery") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

});

function onKeyUpAWBNo() {
    if ($('#txtAWBNo').val().length == 11) {
        $('#txtSBILLNo').focus();
        GetShipmentStatus();
    }
}

function checkDropdownlenth() {

    if ($('#ddlSBNo').val() != null) {
        GetShipmentStatusForDropdown();
    } else {
        GetShipmentStatus();
    }

}

function GetShipmentStatus() {
    // $('#ddlSBNo').empty();

    $('#ddlSBNo').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var SBILLNo;
    var AWBNo = $('#txtAWBNo').val();
    SBILLNo = $('#ddlSBNo').val();
    if (SBILLNo == null) {
        SBILLNo = '';
    }
    if (AWBNo == '') {
        //errmsg = "Please enter AWB No.";
        //$.alert(errmsg);
        $('#spnErrorMsg').text("Please enter AWB No.").css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text("");
    }

   
    // var newOption = $('<option></option>');
    // newOption.val(0).text('Select');
    // newOption.appendTo('#ddlSBNo');

    // if (SBILLNo == '') {
    //     errmsg = "Please enter SBILL No.";
    //     $.alert(errmsg);
    //     return;
    // }

    if (AWBNo.length != '11') {
        //errmsg = "Please enter valid AWB No.";
        //$.alert(errmsg);
        $('#spnErrorMsg').text("Please enter valid AWB No.").css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text("");
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetAWBHistory_PDA_SB",
            data: JSON.stringify({ 'pi_strAWBNo': AWBNo, 'pi_strSBNo': SBILLNo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                debugger
                $("body").mLoading('hide');
                var str = response.d;
                console.log('check response: ', str);
                if (str != null && str != "") {

                    $('#divAddLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Events Name</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Date/Time</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User Name</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);
                    var outMsg = '';
                    $(xmlDoc).find('Table').each(function (index) {

                        outMsg = $(this).find('OutMsg').text();

                        //if (outMsg != '') {
                        //    $.alert(outMsg);
                        //    $('#divAddLocation').empty();
                        //    html = '';
                        //    return;
                        //}
                        if (outMsg != '') {
                            //errmsg = "Please enter valid AWB No.";
                            //$.alert(errmsg);
                            $('#spnErrorMsg').text(outMsg).css('color', 'red');
                            return;
                        } else {
                            $('#spnErrorMsg').text("");
                        }

                        var eventName;
                        var dateTime;
                        var userName;

                        eventName = $(this).find('EventName').text();
                        dateTime = $(this).find('EventDateTime').text();
                        userName = $(this).find('Username').text();

                        AddTableLocation(eventName, dateTime, userName);


                    });


                    $(xmlDoc).find('Table1').each(function (index) {

                        SBId = $(this).find('SBId').text();
                        SBNo = $(this).find('SBNo').text();
                        AWBNo = $(this).find('AWBNo').text();
                        AWBId = $(this).find('AWBId').text();

                        var newOption = $('<option></option>');
                        newOption.val(SBNo).text(SBNo);
                        newOption.appendTo('#ddlSBNo');
                    });


                    if (outMsg == '') {
                        html += "</tbody></table>";

                        $('#divAddLocation').append(html);

                        //  GetSBDetailsBasedOnAWBnumber_PDA(AWBNo);
                    }
                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
}


function GetShipmentStatusForDropdown() {
    // $('#ddlSBNo').empty();

    //$('#ddlSBNo').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlSBNo');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var SBILLNo;
    var AWBNo = $('#txtAWBNo').val();
    SBILLNo = $('#ddlSBNo').val();
    if (SBILLNo == '0') {
        SBILLNo = '';
    }
    if (AWBNo == '') {
        //errmsg = "Please enter AWB No.";
        //$.alert(errmsg);
        $('#spnErrorMsg').text("Please enter AWB No.").css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text("");
    }

    // if (SBILLNo == '') {
    //     errmsg = "Please enter SBILL No.";
    //     $.alert(errmsg);
    //     return;
    // }

    if (AWBNo.length != '11') {
        //errmsg = "Please enter valid AWB No.";
        //$.alert(errmsg);
        $('#spnErrorMsg').text("Please enter valid AWB No.").css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text("");
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetAWBHistory_PDA_SB",
            data: JSON.stringify({ 'pi_strAWBNo': AWBNo, 'pi_strSBNo': SBILLNo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                debugger
                $("body").mLoading('hide');
                var str = response.d;
                console.log('check response: ', str);
                if (str != null && str != "") {

                    $('#divAddLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Events Name</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Date/Time</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User Name</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);
                    var outMsg = '';
                    $(xmlDoc).find('Table').each(function (index) {

                        outMsg = $(this).find('OutMsg').text();

                        //if (outMsg != '') {
                        //    $.alert(outMsg);
                        //    $('#divAddLocation').empty();
                        //    html = '';
                        //    return;
                        //}
                        if (outMsg != '') {
                            //errmsg = "Please enter valid AWB No.";
                            //$.alert(errmsg);
                            $('#spnErrorMsg').text(outMsg).css('color', 'red');
                            return;
                        } else {
                            $('#spnErrorMsg').text("");
                        }

                        var eventName;
                        var dateTime;
                        var userName;

                        eventName = $(this).find('EventName').text();
                        dateTime = $(this).find('EventDateTime').text();
                        userName = $(this).find('Username').text();

                        AddTableLocation(eventName, dateTime, userName);


                    });


                    //$(xmlDoc).find('Table1').each(function (index) {

                    //    SBId = $(this).find('SBId').text();
                    //    SBNo = $(this).find('SBNo').text();
                    //    AWBNo = $(this).find('AWBNo').text();
                    //    AWBId = $(this).find('AWBId').text();

                    //    var newOption = $('<option></option>');
                    //    newOption.val(SBNo).text(SBNo);
                    //    newOption.appendTo('#ddlSBNo');
                    //});


                    if (outMsg == '') {
                        html += "</tbody></table>";

                        $('#divAddLocation').append(html);

                        //  GetSBDetailsBasedOnAWBnumber_PDA(AWBNo);
                    }
                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
}

function AddTableLocation(eventName, dateTime, userName) {
    html += "<tr>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + eventName + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + dateTime + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + userName + "</td>";

    html += "</tr>";
}

function clearBeforePopulate() {
    $('#txtAWBNo').val('');
    $('#spnErrorMsg').text('');
    $('#divAddLocation').empty();
    $('#ddlSBNo').empty();
    
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function alertDismissed() {
}




