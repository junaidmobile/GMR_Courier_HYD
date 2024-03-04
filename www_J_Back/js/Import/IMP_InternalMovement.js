var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var SelectedHawbId;
var IGMno;
var strXmlStore;
var locPieces;
var html;
var FromLoc;
var Hawbid;
var flagMovement;
var serviceName;
var locid;
var OldLocationId;
var IsFlightFinalized;
var GHAflightSeqNo;
var LocCode;
var ISCROWID;

$(function () {

    if (window.localStorage.getItem("RoleIMPIntlMvmt") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    flagMovement = '';
    serviceName = '';

});



function GetImportActiveLocationsV4() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtScanID').val();

    if (MAWBNo == '') {
        return;
    }

    inputxml = '<Root><GroupID>' + $('#txtScanID').val() + '</GroupID><MPSNo>777120335500</MPSNo><AirportCity>IST</AirportCity></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportActiveLocationsV4",
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
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $('#btnMoveDetail').attr('disabled', 'disabled');
                        $('#divVCTDetail').hide();
                        $('#divVCTDetail').empty();
                    } else {
                        $('#spnErrormsg').text('');
                        $('#btnMoveDetail').removeAttr('disabled');
                        $('#btnSubmit').removeAttr('disabled');
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    var HAWB = $(this).find('HAWB').text();
                    var MAWB = $(this).find('MAWB').text();
                    var Remarks = $(this).find('Remarks').text();
                    var MPSNo = $(this).find('MPSNo').text();
                    LocCode = $(this).find('LocCode').text();
                    var NOP = $(this).find('NOP').text();
                    var Weight = $(this).find('Weight').text();
                    var NOG = $(this).find('NOG').text();
                    var ISID = $(this).find('ISID').text();
                    ISCROWID = $(this).find('ISCROWID').text();
                    $("#txtMAWBNo").val(MAWB);
                    $("#txtHAWBNo").val(HAWB);
                    $("#txtMPSNo").val(MPSNo);
                    $("#txtCurrentLocation").val(LocCode);
                    $("#txttxtNOG").val(NOG);
                    $("#txtRemark").val(Remarks);

                    $('#txtNewLocation').focus();

                });

                $(xmlDoc).find('Table2').each(function (index) {
                    var HAWBCount = $(this).find('HAWBCount').text();
                    var MPSCount = $(this).find('MPSCount').text();

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

function UpdateImportLocationV4() {


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    inputXML = '<Root><GroupID>' + $("#txtScanID").val() + '</GroupID><LocCode>' + $("#txtNewLocation").val() + '</LocCode><Remark>' + $("#txtRemark").val() + '</Remark><ISCRowID>' + ISCROWID + '</ISCRowID><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "UpdateImportLocationV4",
            data: JSON.stringify({ 'InputXML': inputXML }),
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
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $('#btnMoveDetail').attr('disabled', 'disabled');
                        $('#divVCTDetail').hide();
                        $('#divVCTDetail').empty();
                        $('#txtNewLocation').val('');
                        $('#txtNewLocation').focus();

                    } else {
                        $('#spnErrormsg').text(StrMessage).css('color', 'green');
                        $("#txtMAWBNo").val('');
                        $("#txtHAWBNo").val('');
                        $("#txtMPSNo").val('');
                        $("#txtCurrentLocation").val('');
                        $("#txttxtNOG").val('');
                        $("#txtRemark").val('');
                        $('#txtScanID').focus();
                        $('#txtScanID').val('');
                        $('#txtNewLocation').val('');
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

function ClearIGM() {

    $('#ddlIGM').empty();
}

function clearALL() {
    $("#txtMAWBNo").val('');
    $("#txtHAWBNo").val('');
    $("#txtMPSNo").val('');
    $("#txtCurrentLocation").val('');
    $("#txttxtNOG").val('');
    $("#txtRemark").val('');
    $('#txtScanID').focus();
    $('#txtScanID').val('');
    $('#txtNewLocation').val('');
    $('#spnErrormsg').text('');
    $('#btnSubmit').attr('disabled', 'disabled');

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
    // $("#txtBCDate").datepicker({
    //     dateFormat: "dd/mm/yy"
    // });
    // $("#txtBCDate").datepicker().datepicker("setDate", new Date());
});
