var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var SelectedHawbId;
var SelectedHawbIdCMS;
var SelectedHawbNo;
var IGMno;
var strXmlStore;
var locPieces;
var html;
var FromLoc;
var GHAMawbid;
var Hawbid;
var GHAhawbid;
var IsFlightFinalized;
var GHAflightSeqNo;
var _FlightSeqNo;
var _MAWBNo;
var _HAWBNo;
var _LocId;
var _HAWBId;
var _LocCode;
var _LocPieces;
var _LocNewPieces;
var _IGMNo;
var _GroupId;
var _Remarks;
var CMSGHAFlag;
var autoLocationArray;
$(function () {

    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    // document.addEventListener('deviceready', AddLocation, false);
    //document.addEventListener('deviceready', AddingTestLocation, false);
    // ImportDataList();
});



function HHTDetentionDetailsOnClickButton() {

    $('#spnErrormsg').text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if ($("#txtHAWBNo").val() == '') {
        //errmsg = "Please enter Group Id.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter HAWB No.").css('color', 'red');
        $("#txtHAWBNo").focus();
        return;
    } else {
        $('#spnErrormsg').text("");
    }

    inputxml = '<Root><HAWBNo>' + $("#txtHAWBNo").val() + '</HAWBNo><MAWBNo></MAWBNo><IGMNo></IGMNo><AirportCity>' + AirportCity + '</AirportCity></Root>';
    // inputxml = '<Root><IsMPSNo>N</IsMPSNo><BarCode>H22</BarCode><Gatepass></Gatepass><AirportCity>HYD</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "HHTDetentionDetails",
            data: JSON.stringify({ 'InputXML': inputxml }),
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
                //$('#divVCTDetail').html('');
                $('#ddlMAWB').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    console.log("Status");
                    console.log(Status);

                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $('#divVCTDetail').hide();
                        $('#divSplitField').hide();
                        $('#divVCTDetail').empty();

                    } else {
                        $('#spnErrormsg').text('');
                        $('#divSplitField').show();
                        $('#txtNewGroupId').focus();
                    }


                });
                $(xmlDoc).find('Table1').each(function (index) {
                    MAWBNo = $(this).find('MAWBNo').text();
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlMAWB');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(MAWBNo).text(MAWBNo);
                    newOption.appendTo('#ddlMAWB');
                });
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}
function HHTDetentionDetails() {

    $('#spnErrormsg').text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if ($("#txtHAWBNo").val() == '') {
        //errmsg = "Please enter Group Id.";
        //$.alert(errmsg);
        // $('#spnErrormsg').text("Please enter Group Id.").css('color', 'red');
        return;
    }

    inputxml = '<Root><HAWBNo>' + $("#txtHAWBNo").val() + '</HAWBNo><MAWBNo></MAWBNo><IGMNo></IGMNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "HHTDetentionDetails",
            data: JSON.stringify({ 'InputXML': inputxml }),
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
                //$('#divVCTDetail').html('');
                $('#ddlMAWB').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    console.log("Status");
                    console.log(Status);

                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $('#divVCTDetail').hide();
                        $('#divSplitField').hide();
                        $('#divVCTDetail').empty();

                    } else {
                        $('#spnErrormsg').text('');
                        $('#divSplitField').show();
                        $('#txtNewGroupId').focus();
                    }


                });
                $(xmlDoc).find('Table1').each(function (index) {
                    MAWBNo = $(this).find('MAWBNo').text();
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlMAWB');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(MAWBNo).text(MAWBNo);
                    newOption.appendTo('#ddlMAWB');
                });
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}


function HHTDetentionDetailsOnChangeMAWB(MAWB) {

    $('#spnErrormsg').text('');
    $('#txtTotalPieces').val('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if ($("#txtHAWBNo").val() == '') {
        //errmsg = "Please enter Group Id.";
        //$.alert(errmsg);
        // $('#spnErrormsg').text("Please enter Group Id.").css('color', 'red');
        return;
    }

    inputxml = '<Root><HAWBNo>' + $("#txtHAWBNo").val() + '</HAWBNo><MAWBNo>' + MAWB + '</MAWBNo><IGMNo></IGMNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "HHTDetentionDetails",
            data: JSON.stringify({ 'InputXML': inputxml }),
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
                $('#ddlIGM').empty();

                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    console.log("Status");
                    console.log(Status);

                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $('#divVCTDetail').hide();
                        $('#divSplitField').hide();
                        $('#divVCTDetail').empty();

                    } else {
                        $('#spnErrormsg').text('');
                        $('#divSplitField').show();
                        $('#txtNewGroupId').focus();
                    }


                });
                $(xmlDoc).find('Table2').each(function (index) {
                    IGMNO = $(this).find('IGMNO').text();
                    MAWBNo = $(this).find('MAWBNo').text();
                    DetentionNo = $(this).find('DetentionNo').text();
                    $('#lblDetentionNo').text(DetentionNo);

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlIGM');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(IGMNO).text(IGMNO);
                    newOption.appendTo('#ddlIGM');
                });


            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}


function HHTDetentionDetailsOnChangeIGMNo(IGM) {

    $('#spnErrormsg').text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if ($("#txtHAWBNo").val() == '') {
        //errmsg = "Please enter Group Id.";
        //$.alert(errmsg);
        // $('#spnErrormsg').text("Please enter Group Id.").css('color', 'red');
        return;
    }

    inputxml = '<Root><HAWBNo>' + $("#txtHAWBNo").val() + '</HAWBNo><MAWBNo>' + $("#ddlMAWB").val() + '</MAWBNo><IGMNo>' + IGM + '</IGMNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "HHTDetentionDetails",
            data: JSON.stringify({ 'InputXML': inputxml }),
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
                //$('#divVCTDetail').html('');
                $('#ddlIGM').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    console.log("Status");
                    console.log(Status);

                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $('#divVCTDetail').hide();
                        $('#divSplitField').hide();
                        $('#divVCTDetail').empty();

                    } else {
                        $('#spnErrormsg').text('');
                        $('#divSplitField').show();
                        $('#txtNewGroupId').focus();
                    }


                });
                $(xmlDoc).find('Table2').each(function (index) {
                    IGMNO = $(this).find('IGMNO').text();
                    MAWBNo = $(this).find('MAWBNo').text();
                    TotalPcs = $(this).find('TotalPcs').text();
                    $('#txtTotalPieces').val(TotalPcs);
                    //if (index == 0) {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlIGM');
                    //}
                    var newOption = $('<option></option>');
                    newOption.val(IGMNO).text(IGMNO);
                    newOption.appendTo('#ddlIGM');
                });


            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function HHTSaveDetentionDetails() {
    if ($('#txtHAWBNo').val() == '') {
        //   $.alert('Please select flight No / Date.');
        $('#spnErrormsg').text("Please enter/scan HAWB No.").css('color', 'red');

        return;
    } else {
        $('#spnErrormsg').text("");
    }

    if ($('#ddlMAWB').val() == '0' || $('#ddlMAWB').val() == null) {
        //   $.alert('Please select flight No / Date.');
        $('#spnErrormsg').text("Please select MAWB No.").css('color', 'red');

        return;
    } else {
        $('#spnErrormsg').text("");
    }
    if ($('#ddlIGM').val() == null || $('#ddlIGM').val() == '0') {
        //   $.alert('Please select flight No / Date.');
        $('#spnErrormsg').text("Please select IGM No.").css('color', 'red');

        return;
    } else {
        $('#spnErrormsg').text("");
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    inputxml = '<Root><HouseNo>' + $('#txtHAWBNo').val() + '</HouseNo><MAWBNo>' + $("#ddlMAWB").val() + '</MAWBNo><IGMNo>' + $("#ddlIGM").val() + '</IGMNo><Pieces>' + $("#txtTotalPieces").val() + '</Pieces><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId><Reason></Reason></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "HHTSaveDetentionDetails",
            data: JSON.stringify({ 'InputXML': inputxml }),
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

                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    console.log("Status");
                    console.log(Status);

                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $('#divVCTDetail').hide();
                        $('#divSplitField').hide();
                        $('#divVCTDetail').empty();

                    } else {
                        $('#spnErrormsg').text(StrMessage).css('color', 'green');
                        $('#divSplitField').show();
                        $('#txtNewGroupId').focus();
                    }


                });
                $(xmlDoc).find('Table2').each(function (index) {
                    IGMNO = $(this).find('IGMNO').text();
                    MAWBNo = $(this).find('MAWBNo').text();
                    TotalPcs = $(this).find('TotalPcs').text();
                    $('#txtTotalPieces').val(TotalPcs);
                    //if (index == 0) {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlIGM');
                    //}
                    var newOption = $('<option></option>');
                    newOption.val(IGMNO).text(IGMNO);
                    newOption.appendTo('#ddlIGM');
                });
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function clearALL() {
    $('#txtHAWBNo').val('');
    $('#txtHAWBNo').focus();
    $('#txtTotalPieces').val('');
    $('#txtNewGroupId').val('');
    $('#txtPieces').val('');
    $('#txtLocation').val('');
    $('#txtRemark').val('');
    $('#divVCTDetail').hide();
    $('#ddlMAWB').empty();
    $('#ddlIGM').empty();
    $('#txtGroupId').focus();
    $('#spnErrormsg').text('');
    $('#lblDetentionNo').text('');
    $('#txtTotalPieces').val('');

}

function VCTNoDetails(MAWBNo, HAWBNo, Remarks, LocPieces) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;width: auto;">' + MAWBNo + ' / ' + HAWBNo + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;width: auto;">' + Remarks + '</td>';
    // html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + Remarks + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-right: 5px;font-size:14px;text-align:right;padding-right: 10px;width: 80px;">' + LocPieces + '</td>';
    html += '</tr>';
}

function SplitGroupId() {

    IsFlightFinalized = '';
    //  $("#btnSubmit").removeAttr("disabled");

    html = '';

    //  $('#divAddTestLocation').empty();

    //clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var AWBNo = $('#txtAWBNo').val();
    //var HAWBNo = $("#ddlHAWB option:selected").text();
    //var IgmId = $("#ddlIGM option:selected").val();
    //var IgmNo = $("#ddlIGM option:selected").text();

    //SelectedHawbId = $("#ddlHAWB option:selected").val();

    var txtGroupId = $("#txtGroupId").val().toUpperCase();
    if ($("#txtGroupId").val() == '') {
        //errmsg = "Please enter Group Id.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter Group Id.").css('color', 'red');
        $("#txtGroupId").focus();
        return;
    } else {
        $('#spnErrormsg').text("");
    }

    var txtNewGroupId = $("#txtNewGroupId").val().toUpperCase();
    if ($("#txtNewGroupId").val() == '') {
        //errmsg = "Please enter New Group Id.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter New Group Id.").css('color', 'red');
        $("#txtNewGroupId").focus();
        return;
    } else {
        $('#spnErrormsg').text('');
    }

    _LocNewPieces = $("#txtPieces").val();
    if ($("#txtPieces").val() == '') {
        //errmsg = "Please enter pieces.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter pieces.").css('color', 'red');
        $("#txtPieces").focus();
        return;
    } else {
        $('#spnErrormsg').text('');
    }

    var txtLocation = $("#txtLocation").val().toUpperCase();
    if ($("#txtLocation").val() == '') {
        //errmsg = "Please enter location.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter location.").css('color', 'red');
        $("#txtLocation").focus();
        return;
    } else {
        $('#spnErrormsg').text('');
    }



    // if (CMSGHAFlag == 'G') {
    //     SaveForwardDetailsForGHA();
    //     return;
    // }

    var totalPieces = Number(_LocPieces) - Number(_LocNewPieces);

    // console.log('pi_strGroupId' + '=' + txtGroupId,
    //             'pi_intGroupPieces' + '=' + totalPieces,
    //             'pi_strNewGroupId' + '=' + txtNewGroupId,
    //             'pi_intNewGroupPieces' + '=' + _LocNewPieces,
    //             'pi_strNewLocation' + '=' + txtLocation,
    //             'pi_intHAWBId' + '=' + _HAWBId,
    //             'pi_intIGMNo' + '=' + _IGMNo,
    //              'pi_strApplication' + '=' + 'H',
    //             'pi_strUserId' + '=' + UserName);

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "SplitGroupId",
            data: JSON.stringify({
                'pi_strGroupId': txtGroupId,
                'pi_intGroupPieces': totalPieces,
                'pi_strNewGroupId': txtNewGroupId,
                'pi_intNewGroupPieces': _LocNewPieces,
                'pi_strNewLocation': txtLocation,
                'pi_intHAWBId': _HAWBId,
                'pi_intIGMNo': _IGMNo,
                'pi_strApplication': 'H',
                'pi_strUserId': UserName
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
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {

                    var OutMsg = $(this).find('OutMsg').text();
                    var ColorCode = $(this).find('ColorCode').text();

                    if (OutMsg != '') {
                        $('#spnErrormsg').text(OutMsg).css('color', ColorCode);
                        $('#txtNewGroupId').focus();
                        $('#txtNewGroupId').val('');
                        $('#txtPieces').val('');
                        $('#txtLocation').val('');
                        $('#txtGroupId').val('');
                        $('#txtGroupId').focus();
                        $('#tblNewsForGatePass').empty();


                    } else {
                        $('#spnErrormsg').text('');
                    }


                });

                // setTimeout(function () {
                //     GetHAWBDetailsForMAWB();
                // }, 6000);


            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}



function AddTableLocation(loc, locpieces) {

    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + loc + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + locpieces + "</td>";
    html += "</tr>";

}


function ClearIGM() {

    //  $('#ddlIGM').empty();
}

function clearBeforePopulate() {
    // $('#txtFromLoc').val('');
    // $('#txtTotPkgs').val('');
    // $('#txtMovePkgs').val('');
    // $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    // var ScanCode = $('#txtAWBNo').val();
    // ScanCode = ScanCode.replace(/\s+/g, '');
    // ScanCode = ScanCode.replace("-", "").replace("–", "");

    // if (ScanCode.length >= 11) {

    //     $('#txtAWBNo').val(ScanCode.substr(0, 11));
    //     //$('#txtAWBNo').val(ScanCode.substr(3, 8));
    //     //$('#txtScanCode').val('');

    //     //GetShipmentStatus();
    // }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

$(function () {
    //$("#txtBCDate").datepicker({
    //    dateFormat: "dd/mm/yy"
    //});
    //$("#txtBCDate").datepicker().datepicker("setDate", new Date());
});

function ImportDataList() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "ImportDataList",
            data: JSON.stringify({ 'pi_strQueryType': 'I' }),
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

                var str = response;
                autoLocationArray = new Array();

                // This will return an array with strings "1", "2", etc.
                autoLocationArray = str.split(",");
                console.log(autoLocationArray)
                $("#txtLocation").autocomplete({
                    source: autoLocationArray,
                    minLength: 1,
                    select: function (event, ui) {
                        log(ui.item ?
                            "Selected: " + ui.item.label :
                            "Nothing selected, input was " + this.value);
                    },
                    open: function () {
                        $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    },
                    close: function () {
                        $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                    }
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}


function log(message) {
    $("<div>").text(message).prependTo("#log");
    $("#log").scrollTop(0);
}