

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");

var html;
var LocationRowID;
var AWBRowID;
var HAWBId;
var inputRowsforLocation = "";
var _ULDFltSeqNo;
var DockInDoor;
//document.addEventListener("pause", onPause, false);
//document.addEventListener("resume", onResume, false);
//document.addEventListener("menubutton", onMenuKeyDown, false);

//function onPause() {

//    HHTLogout();
//}

//function onResume() {
//    HHTLogout();
//}

//function onMenuKeyDown() {
//    HHTLogout();
//}



$(function () {

    if (window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }


    //var formattedDate = new Date();
    //var d = formattedDate.getDate();
    //if (d.toString().length < Number(2))
    //    d = '0' + d;
    //var m = formattedDate.getMonth();
    //m += 1;  // JavaScript months are 0-11
    //if (m.toString().length < Number(2))
    //    m = '0' + m;
    //var y = formattedDate.getFullYear();
    //var t = formattedDate.getTime();
    //var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    //newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    //$('#txtFlightDate').val(newDate);

    //var h = date.getHours();
    //var m = date.getMinutes();
    //var s = date.getSeconds();

});


function checkLocation() {
    var location = $('#txtLocation').val();
    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });

        return;
    } else {
        $('#txtSacnULD').focus();
        $("#spnMsg").text('');
    }
}

function GetVCTDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtVCTNo = $('#txtVCTNo').val();

    if (txtVCTNo == '') {
        return;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetVCTDetailsByVCTNo",
            data: JSON.stringify({
                'pi_strVCTNo': txtVCTNo
                //'strUserId': UserId,
                //'strVal': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                $('#lblMessageSuccess').text('');
                $('#divVCTDetail').html('');
                $('#divVCTDetail').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();

                    var StrMessage = $(this).find('StrMessage').text()
                    var OutMsg = $(this).find('OutMsg').text();

                    if (OutMsg != '') {
                        $('#lblMessage').text(OutMsg).css('color', 'red');
                    } else {
                        $('#lblMessage').text('');
                    }

                    //if (Status == 'E') {
                    //    $("#spnMsg").text('');
                    //    $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    //    //$('#divVCTDetail').empty();
                    //    //$('#divVCTDetail').hide();
                    //    html = '';
                    //    return true;
                    //}


                });

                if (response != null && response != "") {

                    html = '';

                    html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Dock In Date/Time</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Dock Out Date/Time</th>';
                    // html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Pieces</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    $(xmlDoc).find('Table').each(function (index) {

                        //var Status = $(this).find('Status').text();
                        //var StrMessage = $(this).find('StrMessage').text();
                        //if (Status == 'E') {
                        //    $.alert(StrMessage);
                        //    $('#divULDNumberDetails').empty();
                        //    $('#divULDNumberDetails').hide();
                        //    html = '';
                        //    return;
                        //}

                        flag = '1';

                        OutMsg = $(this).find('OutMsg').text();
                        VCTNo = $(this).find('VCTNo').text();
                        DockInDt = $(this).find('DockInDt').text();
                        DockInUser = $(this).find('DockInUser').text();
                        DockInStatus = $(this).find('DockInStatus').text();
                        DockInDoor = $(this).find('DockInDoor').text();
                        DockOutDt = $(this).find('DockOutDt').text();
                        DockOutDt1 = $(this).find('DockOutDt1').text();
                        DockOutStatus = $(this).find('DockOutStatus').text();
                        SBId = $(this).find('SBId').text();

                        if (DockInStatus == 'false' && OutMsg != 'Invalid VCT No.') {

                            $('#divDoor').show();
                            $('#btnDockIn').removeAttr('disabled');
                        } else {
                            $('#btnDockIn').attr('disabled', 'disabled');
                            $('#divDoor').hide();
                        }



                        if (DockOutStatus == 'false' && DockInDoor != '') {
                            $('#btnDockOut').removeAttr('disabled');
                        } else {
                            $('#btnDockOut').attr('disabled', 'disabled');
                        }


                        if (DockOutStatus == 'true' && DockInStatus == 'true') {
                            $('#lblMessageSuccess').text('');
                            $('#btnDockOut').attr('disabled', 'disabled');
                            $('#btnDockIn').attr('disabled', 'disabled');
                            $('#lblMessage').text('Dock-In and Dock-Out is already done.').css('color', 'red');
                        }

                        VCTNoDetails(DockInDt, DockOutDt);
                    });
                    html += "</tbody></table>";
                    if (VCTNo != '') {
                        $('#divVCTDetail').show();
                        $('#divVCTDetail').append(html);
                    }


                } else {
                    errmsg = 'VCT No. does not exists.';
                    $.alert(errmsg);
                }
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}






function UpdateVCTStatus(D_Status) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtVCTNo = $('#txtVCTNo').val();

    if (D_Status == 'I') {
        if ($('#txtDoorNo').val() == "") {
            $('#lblMessage').text('Please enter door No.').css('color', 'red');
            return;
        } else {
            var txtDoorNo = $('#txtDoorNo').val();
            $('#lblMessage').text('');
        }

    } else {
        var txtDoorNo = DockInDoor;
    }



    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var t = formattedDate.getTime();
    var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    newDate = y.toString() + '-' + m.toString() + '-' + d.toString(); var _Mode;


    var allParm = 'pi_strVCTNo == ' + txtVCTNo + '  ' +
                //'pi_VCTDatetime == ' + newDate + '  ' +
                'pi_strUserId == ' + UserId + '  ' +
                'pi_strMode == ' + D_Status + '  ' +
                'pi_strDoor == ' + txtDoorNo


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "UpdateVCTDokInDockOutStatus",
            data: JSON.stringify({
                'pi_strVCTNo': txtVCTNo,
                //'pi_VCTDatetime': newDate,
                'pi_strUserId': UserName,
                'pi_strMode': D_Status,
                'pi_strDoor': txtDoorNo
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $('#lblMessageSuccess').text('');
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {
                    // $.alert($(this).find('OutMsg').text());


                    //var OutMsg = $(this).find('OutMsg').text();

                    //if (OutMsg == 'Dock-Out completed successfully.') {
                    //    $('#lblMessageSuccess').text($(this).find('OutMsg').text()).css('color', 'green');
                    //    $('#btnDockOut').attr('disabled', 'disabled');
                    //}

                    //if (OutMsg == 'Dock-In completed successfully.') {
                    //    $('#lblMessageSuccess').text($(this).find('OutMsg').text()).css('color', 'green');
                    //    $('#btnDockIn').attr('disabled', 'disabled');
                    //}



                    var status = $(this).find('Status').text();
                    var OutMsg = $(this).find('OutMsg').text();
                    if (status == 'E') {

                        $('#lblMessageSuccess').text(OutMsg).css('color', 'red');

                    } else if (status == 'S') {
                        $('#lblMessageSuccess').text(OutMsg).css('color', 'green');

                        if (D_Status == 'I') {

                            $('#btnDockIn').attr('disabled', 'disabled');
                            $('#btnDockOut').removeAttr('disabled');
                            $('#divDoor').hide();

                        } else if (D_Status == 'O') {
                            $('#btnDockOut').attr('disabled', 'disabled');
                        }
                    }

                    //$("#spnMsg").text('');
                    //var Status = $(this).find('Status').text();
                    //var StrMessage = $(this).find('StrMessage').text();
                    //var TxtColor = $(this).find('TxtColor').text();

                    //if (Status == 'E') {

                    //    $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    //    $('#divULDNumberDetails').empty();
                    //    $('#divULDNumberDetails').hide();
                    //    html = '';
                    //    return true;
                    //} else {
                    //    $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    //}
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });



                // setTimeout(function () { GetVCTDetails(); }, 4000);
                //GetVCTDetails();

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}

function VCTNoDetails(DockInDt, DockOutDt) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;">' + DockInDt + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;">' + DockOutDt + '</td>';
    // html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + DlvblPkgs + '</td>';
    html += '</tr>';
}


function clearAWBDetails() {
    $('#txtSacnULD').val('');
    $('#txtScanFlight').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#tblNewsForGatePass').hide();
    $('#divULDNumberDetails').empty();
    $('#txtDoorNo').val('');
    $('#txtVCTNo').val('');
    $('#txtLocation').val('');
    $('#spnMsg').text('');
    $('#lblMessage').text('');

    $('#lblMessageSuccess').text('');

}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

