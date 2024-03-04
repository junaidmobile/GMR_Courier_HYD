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
var _IGMNo;
var _GroupId;
var _Remarks;
var CMSGHAFlag;
var _SBId;
var autoLocationArray;
$(function () {

    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    document.addEventListener('deviceready', AddLocation, false);
    //document.addEventListener('deviceready', AddingTestLocation, false);

    ImportDataList();

    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';

    //SHCSpanHtml(stringos);

});

function CheckEmpty() {

    if ($('#txtGroupId').val() != '' && $('#txtLocation').val() != '') {
        $('#btnMoveDetail').removeAttr('disabled');
    } else {
        $('#btnMoveDetail').attr('disabled', 'disabled');
        return;
    }

}

function SHCSpanHtml(newSHC) {
    var spanStr = "<tr class=''>";
    var newSpanSHC = newSHC.split(',');
    var filtered = newSpanSHC.filter(function (el) {
        return el != "";
    });

    for (var n = 0; n < filtered.length; n++) {
        var blink = filtered[n].split('~');

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'Y' && filtered[n] != '~Y') {
                spanStr += "<td class='blink_me'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}

function GetHAWBDetailsForMAWB() {
    $('#divVCTDetail').hide();
    $('#divVCTDetail').empty();
    IsFlightFinalized = '';
    GHAMawbid = '';
    Hawbid = '';
    GHAhawbid = '';
    IsFlightFinalized = '';
    GHAflightSeqNo = '';
    html = '';
    $('#spnErrormsg').text('');
    //$('#txtOrigin').val('');
    //$('#txtDestination').val('');
    //$('#txtTotalPkg').val('');
    //$('#txtCommodity').val('');
    //$('#divAddTestLocation').empty();

    //var list = new Array();
    //var uniqueIgms = [];

    //$('#ddlHAWB').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlHAWB');

    //$('#ddlIGM').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlIGM');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = '';// $('#txtAWBNo').val();
    var txtGroupId = $('#txtGroupId').val();
    var txtLocation = $('#txtLocation').val();

    if (txtGroupId == '') {
        return;
    } else {
        $('#txtLocation').focus();
    }

    //if ($('#txtGroupId').val() != '' && $('#txtLocation').val() != '') {
    //    $('#btnMoveDetail').removeAttr('disabled');
    //} else {
    //    $('#btnMoveDetail').attr('disabled', 'disabled');
    //    return;
    //}


    //if (MAWBNo.length != '11') {
    //    if (MAWBNo.length != '13') {
    //        errmsg = "Please enter valid AWB No.";
    //        $.alert(errmsg);
    //        // $('#txtAWBNo').val('');
    //        return;
    //    }
    //}

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "Exp_GetLocationDetailFromGroupId",
            data: JSON.stringify({ 'pi_strGroupId': txtGroupId }),
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
                //$('#divVCTDetail').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {
                    var outMsg = $(this).find('OutMsg').text(); //added on 17/06
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    console.log('check outmsg here: ', outMsg);

                    //if (outMsg == 'Shipment information does not exists') { //added on 17/06
                    //    $.alert(outMsg);
                    //}

                    if (outMsg != '') {
                        $('#spnErrormsg').text(outMsg).css('color', 'red');
                        $('#btnMoveDetail').attr('disabled', 'disabled');
                        $('#divVCTDetail').hide();
                        $('#divVCTDetail').empty();
                        $('#txtGroupId').val('');
                        $('#txtGroupId').focus();

                    } else {
                        $('#spnErrormsg').text('');
                        $('#btnMoveDetail').removeAttr('disabled');
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
                    $('#divVCTDetail').hide();
                    $('#tblNewsForGatePass').empty();
                    html = '';

                    //html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                    //html += '<thead>';
                    //html += '<tr>';
                    //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Group Id</th>';
                    //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Peices</th>';
                    //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Cancel</th>';
                    //html += '</tr>';
                    //html += '</thead>';
                    //html += '<tbody>';

                    html += '<table id="tblNewsForGatePass" class="table table-striped table-bordered">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th style="background-color:rgb(208, 225, 244);">MAWB</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">HAWB</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Remark</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">NoP</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    $(xmlDoc).find('Table').each(function (index) {
                        $('#lblMessage').text('');
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

                        _MAWBNo = $(this).find('MAWBNo').text();
                        _HAWBNo = $(this).find('HAWBNo').text();
                        _LocId = $(this).find('LocId').text();
                        _HAWBId = $(this).find('HAWBId').text();
                        _LocCode = $(this).find('LocCode').text();
                        _LocPieces = $(this).find('LocPieces').text();
                        _SBId = $(this).find('SBId').text();
                        _GroupId = $(this).find('GroupId').text();
                        _Remarks = $(this).find('Remarks').text();
                        _IsOutOfWarehouse = $(this).find('IsOutOfWarehouse').text();
                        CMSGHAFlag = $(this).find('CMSGHAFlag').text();
                        _FlightSeqNo = $(this).find('FlightSeqNo').text();

                        NOG = $(this).find('NOG').text();


                        var newSHC = $(this).find('SHCCodes').text();
                        $("#TextBoxDiv").empty();
                        SHCSpanHtml(newSHC);

                        $('#txtLocationShow').val(_LocCode);
                        $('#txtNOG').val(NOG);
                        $('#txtRemark').val(_Remarks);

                        VCTNoDetails(_MAWBNo, _HAWBNo, _Remarks, _LocPieces);
                    });
                    html += "</tbody></table>";
                    if (_GroupId != '') {
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

function grplength() {
    if ($('#txtGroupId').val().length == 14) {
        $('#txtLocation').focus();
    }
}

function VCTNoDetails(MAWBNo, HAWBNo, Remarks, LocPieces) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);">' + MAWBNo + '</td>';
    html += '<td style="background: rgb(224, 243, 215);">' + HAWBNo + '</td>';
    html += '<td style="background: rgb(224, 243, 215);">' + Remarks + '</td>';
    html += '<td style="background: rgb(224, 243, 215);">' + LocPieces + '</td>';
    html += '</tr>';
}

function GetIGMDetails() {

    GHAMawbid = '';
    Hawbid = '';
    GHAhawbid = '';
    GHAflightSeqNo = '';
    html = '';

    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtTotalPkg').val('');
    $('#txtCommodity').val('');
    $('#divAddTestLocation').empty();

    var list = new Array();
    var uniqueIgms = [];

    $('#ddlIGM').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();

    if (MAWBNo == '') {
        return;
    }

    if (MAWBNo.length != '11') {
        if (MAWBNo.length != '13') {
            errmsg = "Please enter valid AWB No.";
            $.alert(errmsg);
            $('#txtAWBNo').val('');
            return;
        }
    }

    if (HAWBNo == 'Select') {
        HAWBNo = '';
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetHAWBNumbersForMAWBNumber_PDA",
            data: JSON.stringify({ 'pi_strMAWBNo': MAWBNo, 'pi_strHAWBNo': HAWBNo, 'pi_strAirport': AirportCity, 'pi_strEvent': 'I' }),
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
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    var outMsg = $(this).find('Status').text();

                    if (outMsg == 'E') {
                        $.alert($(this).find('StrMessage').text());
                        return;
                    }
                    else {

                        var IGMid = $(this).find('Process').text();
                        var IGMNo = $(this).find('IGMNo').text();

                        if (IGMNo != '') {

                            var newOption = $('<option></option>');
                            newOption.val(IGMid).text(IGMNo);
                            newOption.appendTo('#ddlIGM');
                        }
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


function ImportDataList() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "ImportDataList",
            data: JSON.stringify({ 'pi_strQueryType': 'E' }),
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

function GetMovementDetailsFromGHA() {


    $("#btnSubmit").removeAttr("disabled");

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();
    var IgmNo = $("#ddlIGM option:selected").text();

    var IgmVal = $("#ddlIGM option:selected").val();

    if (HAWBNo == 'Select') {
        HAWBNo = '';
    }

    SelectedHawbId = $("#ddlHAWB option:selected").val();

    //var inputXML = '<Root><MAWBID>' + GHAMawbid + '</MAWBID><HAWBID>' + SelectedHawbId + '</HAWBID><IGMNo>' + IgmNo + '</IGMNo><FlightSeqNo>' + GHAflightSeqNo + '</FlightSeqNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + HAWBNo + '</HouseNo><IGMNo>' + IgmVal + '</IGMNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetBinningLocPkgDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                strXmlStore = str;


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



function GetMovementDetails() {

    IsFlightFinalized = '';
    $("#btnSubmit").removeAttr("disabled");

    html = '';

    $('#divAddTestLocation').empty();

    //clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();
    var IgmId = $("#ddlIGM option:selected").val();
    var IgmNo = $("#ddlIGM option:selected").text();



    //SelectedHawbId = $("#ddlHAWB option:selected").val();

    var txtGroupId = $("#txtGroupId").val().toUpperCase();
    if ($("#txtGroupId").val() == '') {
        errmsg = "Please enter groupId.";
        $.alert(errmsg);
        return;
    }

    var txtLocation = $("#txtLocation").val().toUpperCase();
    if ($("#txtLocation").val() == '') {
        errmsg = "Please enter location.";
        $.alert(errmsg);
        return;
    }

    //if (HAWBNo == 'Select') {
    //    HAWBNo = '';
    //}

    //if (IgmNo == 'Select' || IgmNo == '') {
    //    errmsg = "Please select IGM</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    //if (IgmId.match("^G")) {
    //    IsFlightFinalized = 'false';
    //    GetMovementDetailsFromGHA();
    //    return;
    //}

    //if (IgmId.match("^C")) {
    //    IsFlightFinalized = 'true';
    //}
    //if (IsFlightFinalized == 'false') {

    //    return;
    //}

    if (CMSGHAFlag == 'G') {
        SaveForwardDetailsForGHA();
        return;
    }


    var inno = 'pi_strGroupId' + '=  ' + txtGroupId + ' ' +
        'pi_intExistLocId' + '=  ' + _LocId + ' ' +
        'pi_strExistsLocation' + '=  ' + _LocCode + ' ' +
        'pi_intLocPieces' + '=  ' + _LocPieces + ' ' +
        'pi_strNewGroupId' + '=  ' + txtGroupId + ' ' +
        'pi_strNewLocation' + '= ' + txtLocation + ' ' +
        'pi_intNewLocPieces' + '=  ' + _LocPieces + ' ' +
        'pi_strUserId' + '=  ' + UserName + ' ' +
        'pi_intHAWBId' + '=  ' + _HAWBId + ' ' +
        'pi_intIGMNo' + '=  ' + _SBId


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "Exp_SaveInternalMovementBaseOnGroupId",
            data: JSON.stringify({
                'pi_strGroupId': txtGroupId,
                'pi_intExistLocId': _LocId,
                'pi_strExistsLocation': _LocCode,
                'pi_intLocPieces': _LocPieces,
                'pi_strNewGroupId': txtGroupId,
                'pi_strNewLocation': txtLocation,
                'pi_intNewLocPieces': _LocPieces,
                'pi_strUserId': UserName,
                'pi_intHAWBId': _HAWBId,
                'pi_intSBId': _SBId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
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
                        //if (OutMsg == 'Location details updated successfully') {
                        //    $('#spnErrormsg').text(OutMsg).css('color', ColorCode);
                        //} else {
                        //    $('#spnErrormsg').text(OutMsg).css('color', 'red');
                        //}
                        //  $('#btnMoveDetail').attr('disabled', 'disabled');
                        // $('#divVCTDetail').hide();
                        // $('#tblNewsForGatePass').empty();
                        $('#txtLocation').val('');
                    } else {
                        $('#spnErrormsg').text('');
                        // $('#btnMoveDetail').removeAttr('disabled');
                    }


                });

                setTimeout(function () {

                    GetHAWBDetailsForMAWB();
                }, 6000);


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

function GetMovementDetailsFromGHA() {


    $("#btnSubmit").removeAttr("disabled");

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();
    var IgmNo = $("#ddlIGM option:selected").text();

    var IgmVal = $("#ddlIGM option:selected").val();

    if (HAWBNo == 'Select') {
        HAWBNo = '';
    }

    SelectedHawbId = $("#ddlHAWB option:selected").val();

    //var inputXML = '<Root><MAWBID>' + GHAMawbid + '</MAWBID><HAWBID>' + SelectedHawbId + '</HAWBID><IGMNo>' + IgmNo + '</IGMNo><FlightSeqNo>' + GHAflightSeqNo + '</FlightSeqNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + HAWBNo + '</HouseNo><IGMNo>' + IgmVal + '</IGMNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetBinningLocPkgDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Location</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Binned Pkgs.</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

                        var outMsg = $(this).find('Status').text();

                        if (outMsg == 'E') {
                            $.alert($(this).find('StrMessage').text());
                            return;
                        }

                        var location;

                        location = $(this).find('LocCode').text().toUpperCase();
                        locPieces = $(this).find('LocPieces').text();

                        $('#txtOrigin').val($(this).find('Origin').text());
                        $('#txtDestination').val($(this).find('Destination').text());

                        AddTableLocation(location, locPieces);

                        if (index == 0) {
                            $('#txtTotalPkg').val($(this).find('LocationStatus').text());
                            $('#txtCommodity').val($(this).find('Commodity').text());
                            Hawbid = $(this).find('HAWBId').text();
                        }

                        var remainingPieces = $(this).find('RemainingPieces').text().substr(0, $(this).find('RemainingPieces').text().indexOf('/'));

                        if (remainingPieces == 0)
                            $("#btnSubmit").attr("disabled", "disabled");
                    });

                    html += "</tbody></table>";

                    if (locPieces != '0' && locPieces != '')
                        $('#divAddTestLocation').append(html);
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

function SaveForwardDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var HAWBNo = $("#ddlHAWB option:selected").text();
    var IgmNo = $("#ddlIGM option:selected").text();
    SelectedHawbNo = $("#ddlHAWB option:selected").text();

    var location = $('#txtLocation_0').val().toUpperCase();
    var BinnPckgs = $('#txtBinnPkgs_0').val();

    if (location == '') {
        errmsg = "Please enter location</br>";
        $.alert(errmsg);
        return;
    }

    if (BinnPckgs == '') {
        errmsg = "Please enter binn pckgs</br>";
        $.alert(errmsg);
        return;
    }

    if (SelectedHawbNo == '' || SelectedHawbNo == 'Select') {
        //SelectedHawbId = Hawbid;
        SelectedHawbNo = '';
    }

    if ($('#ddlIGM').val() == '0' && $('select#ddlIGM option').length > 1) {
        errmsg = "Please select IGM</br>";
        $.alert(errmsg);
        return;
    }


    if (IGMno == '') {
        errmsg = "IGM No. could not be found.</br>";
        $.alert(errmsg);
        return;
    }

    if (IsFlightFinalized == 'false') {
        SaveForwardDetailsForGHA();
        return;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "SaveLocationDetails_PDA",
            data: JSON.stringify({
                'pi_intIGMNo': IgmNo, 'pi_intHAWBNo': SelectedHawbIdCMS,
                'pi_strLocation': location, 'pi_intLocPieces': BinnPckgs, 'pi_strUserName': window.localStorage.getItem("UserName"),
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                $.alert(response.d);

                $('#txtLocation_0').val('');
                $('#txtBinnPkgs_0').val('');
                GetMovementDetails();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert(msg.d);
            }
        });
        return false;
    }

}

function SaveForwardDetailsForGHA() {
    debugger
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();

    if ($('#txtGroupId').val() == '') {
        errmsg = "Please enter Group Id.";
        $.alert(errmsg);
        return;
    }

    var IgmId = $("#ddlIGM option:selected").val();
    SelectedHawbNo = $("#ddlHAWB option:selected").text();



    //var inputXML = '<Root><MAWBID>' + GHAMawbid + '</MAWBID><HAWBID>' + GHAhawbid + '</HAWBID><IGMNo>' + IgmNo + '</IGMNo><FlightSeqNo>' + GHAflightSeqNo + '</FlightSeqNo><LocCode>' + location + '</LocCode><NOP>' + BinnPckgs + '</NOP><Weight></Weight><LocId></LocId><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><AWBNo>' + _MAWBNo + '</AWBNo><HouseNo>' + _HAWBNo + '</HouseNo><IGMNo>' + _IGMNo + '~' + _FlightSeqNo + '</IGMNo><LocCode>' + $('#txtLocation').val().toUpperCase() + '</LocCode><LocId>' + _LocId + '</LocId><NOP>' + _LocPieces + '</NOP><UserId>' + UserID + '</UserId><AirportCity>' + AirportCity + '</AirportCity><GroupID>' + $('#txtGroupId').val().toUpperCase() + '</GroupID></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "SaveBinningV2",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('StrMessage').text() != '')
                        $.alert($(this).find('StrMessage').text());
                    else
                        $.alert('Success');
                });

                $('#txtLocation').val('');
                //$('#txtBinnPkgs_0').val('');
                //  GetMovementDetailsFromGHA();
                GetHAWBDetailsForMAWB();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert(msg.d);
            }
        });
        return false;
    }

}

function AddLocation() {
    console.log("Location Added");
    var LocCont = $('#divAddLocation > *').length;
    var no = '0';
    var LocCount;
    if ($('#divAddLocation > *').length > 0) {
        no = parseInt($('#divAddLocation').children().last().attr('id').split('_')[1]) + 1;
    }
    if (no != undefined || no != '') {
        LocCount = no;
    }
    var str = "";
    str = '<div id="loc_' + LocCount + '" class="row panel panel-widget forms-panel form-grids widget-shadow" style="margin-top:5px;">'
    str += '<div class="row">'
    str += '<div class="col-xs-12">'
    str += '<a>'
    //str += '<button class="btn btn-success btn-xs" onclick="RemoveLocation(' + LocCount + ',event );" style="float:right;"><span class="glyphicon glyphicon-remove-circle" style="float: right;color:red;"></span></button>'
    //str += '<span class="glyphicon glyphicon-remove-circle" style="float: right;color:red;" onclick="RemoveLocation(' + LocCount + ');"></span>'
    str += '</a>'
    str += '</div>'
    str += '</div>'
    str += '<div class="forms">'
    str += '<div class="form-body">'
    str += '<div class="row form-group" style="margin-bottom: 0px;">'
    str += '<div class="form-group col-xs-6 col-sm-6 col-md-6" style="padding-left: 0px;">'
    str += '<label id="lblLocation_' + LocCount + '" for="txtLocation_' + LocCount + '" class="control-label">Location</label>'
    str += '<font color="red">*</font>'
    //str += '<select class="form-control" id="ddlLocation_' + LocCount + '">'
    str += '<input id="txtLocation_' + LocCount + '" class="form-control" type="text" maxlength="20">'
    //str += '<option value="0">Select</option>'
    //str += '</select>'
    str += '</div>'
    //str += '<div class="form-group col-xs-6 col-sm-6 col-md-6" style="padding-right: 0px;">'
    //str += '<label id="lblArea_' + LocCount + '" for="txtArea_' + LocCount + '" class="control-label">Area</label>'
    //str += '<font color="red">*</font>'
    //str += '<input id="txtArea_' + LocCount + '" class="form-control" type="text" maxlength="20">'
    //str += '</div>'
    //str += '</div>'
    //str += '<div class="row form-group" style="margin-bottom: 0px;">'
    //str += '<div class="form-group col-xs-6 col-sm-6 col-md-6" style="padding-left: 0px;">'
    //str += '<label id="lblTerminal_' + LocCount + '" for="txtTerminal_" class="control-label">Terminal</label>'
    //str += '<font color="red">*</font>'
    //str += '<input id="txtTerminal_' + LocCount + '" class="form-control" type="text" maxlength="20">'
    //str += '</div>'
    str += '<div class="form-group col-xs-6 col-sm-6 col-md-6" style="padding-right: 0px;">'
    str += '<label id="lblBinnPkgs_' + LocCount + '" for="txtBinnPkgs_" class="control-label">Binn Pkgs</label>'
    str += '<font color="red">*</font>'
    str += '<input id="txtBinnPkgs_' + LocCount + '" class="form-control" type="number" onkeyup="ChkMaxLength(this, 4); NumberOnly(event);" style="text-align:right;" max="9999999">'
    str += '</div>'
    str += '</div>'
    str += '</div>'
    str += '</div>'
    //$('#divAddLocation').append(str);
    //MSApp.execUnsafeLocalFunction(function () {
    //    $('#divAddLocation').append(str);
    //});
    if (typeof (MSApp) !== "undefined") {
        MSApp.execUnsafeLocalFunction(function () {
            $('#divAddLocation').append(str);
        });
    } else {
        $('#divAddLocation').append(str);
    }
}

function clearALL() {
    $('#txtGroupId').val('');
    $('#txtLocation').val('');
    $('#txtLocationShow').val('');
    $('#txtNOG').val('');
    $('#txtRemark').val('');
    $('#divVCTDetail').hide();
    $('#divAddTestLocation').empty();
    $('#txtGroupId').focus();
    $('#spnErrormsg').text('');
    $('#btnMoveDetail').attr('disabled', 'disabled');
    $("#TextBoxDiv").empty();
}

function ClearIGM() {

    $('#ddlIGM').empty();
}

function clearBeforePopulate() {
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    ScanCode = ScanCode.replace(/\s+/g, '');
    ScanCode = ScanCode.replace("-", "").replace("–", "");

    if (ScanCode.length >= 11) {

        $('#txtAWBNo').val(ScanCode.substr(0, 11));
        //$('#txtAWBNo').val(ScanCode.substr(3, 8));
        //$('#txtScanCode').val('');

        //GetShipmentStatus();
    }
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


