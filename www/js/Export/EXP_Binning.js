var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
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
var ISCROWID;

var LocCode;
var EXPSHIROWID;
var ShipmentLevel;
var HouseNo;

$(function () {

    if (window.localStorage.getItem("RoleIMPIntlMvmt") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    flagMovement = '';
    serviceName = '';

});



function GetBinningDetailsV4() {
    $('#spnErrormsg').text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var scannedNo = $('#txtScanID').val();

    if (scannedNo == '') {
        return;
    }

    inputxml = '<Root><ScanCode>' + scannedNo + '</ScanCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetBinningDetails_V4",
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

                    if (Status == 'S') {
                        // $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        // $('#btnMoveDetail').attr('disabled', 'disabled');
                        // $('#divVCTDetail').hide();
                        // $('#divVCTDetail').empty();
                        $('#btnSubmit').removeAttr('disabled');

                    } else {
                        // $('#spnErrormsg').text('');
                        // $('#btnMoveDetail').removeAttr('disabled');
                        // $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $.alert(StrMessage);
                        clearALL();
                        document.querySelector("#grid").innerHTML = '';
                    }
                });

                $(xmlDoc).find('Table2').each(function (index) {
                    var HAWB = $(this).find('HouseNo').text();
                    var MAWB = $(this).find('MAWB').text();
                    var MHBS = $(this).find('MHBS').text();
                    var MPSNo = $(this).find('MPSNo').text();
                    LocCode = $(this).find('LocCode').text();
                    var NOP = $(this).find('NOP').text();
                    var Weight = $(this).find('Weight').text();
                    var NOG = $(this).find('NOG').text();

                    EXPSHIROWID = $(this).find('EXPSHIPROWID').text();
                    HouseNo = $(this).find('HouseNo').text();
                    ShipmentLevel = $(this).find('ShipmentLevel').text();
                    $("#txtMAWBNo").val(MAWB);
                    $("#txtHAWBNo").val(HAWB);
                    $('#txtMHBSNo').val(MHBS);
                    $("#txtMPSNo").val(MPSNo);
                    // $("#txtCurrentLocation").val(LocCode);
                    $("#txttxtNOG").val(NOG);
                    // $("#txtRemark").val(Remarks);

                    $('#txtNewLocation').focus();

                });
                $("#grid").empty();
                $(xmlDoc).find('Table2').each(function (index) {


                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Location</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pieces</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(response);

                    $(xmlDoc).find('Table2').each(function (index) {

                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg != '') {
                            $.alert(outMsg);
                            $('#divAddTestLocation').empty();
                            html = '';
                            return;
                        }

                        var location;

                        var Location = $(this).find('LocCode').text();
                        var Pieces = $(this).find('NOP').text();
                        var ShipmentLevel = $(this).find('ShipmentLevel').text();

                        $('#txtOrigin').val($(this).find('Origin').text());
                        $('#txtDestination').val($(this).find('Destination').text());

                        if (ShipmentLevel == 'B' || ShipmentLevel == 'M') {
                            $('#txtNewPcs').val(Pieces).attr('disabled', 'disabled');
                            $('#txtCurrentLocation').val(Location).attr('disabled', 'disabled');
                        } else {
                            $('#txtNewPcs').val('').removeAttr('disabled');
                            $('#txtCurrentLocation').removeAttr('disabled');
                            $('#txtNewLocation').focus();
                        }

                        AddTableLocation(Location, Pieces, ShipmentLevel);
                    });

                    html += "</tbody></table>";

                    //if (locPieces != '0')
                    $('#divAddTestLocation').append(html);

                    //if (Location != '') {
                    //    document.querySelector("#grid").innerHTML += `
                    //    <div class="form-group col-xs-12 col-sm-6 col-md-6 NoPadding">
                    //        <div class="col-xs-6 col-form-label">
                    //            <label id="lblScanID" for="txtScanID">${Location}</label>                                            
                    //        </div>
                    //        <div class="col-xs-6 NoPadding">
                    //            <label id="lblScanID" for="txtScanID">${Pieces}</label>
                    //        </div>
                    //    </div>

                    //    `
                    //}

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

function AddTableLocation(loc, locpieces, _ShipmentLevel) {

    html += "<tr onclick='SelectLocationInfo();'>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + loc + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + locpieces + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;display:none;font-size:14px'align='center'>" + _ShipmentLevel + "</td>";
    html += "</tr>";

}

function SaveBinningDetails_V4() {

    $('#spnErrormsg').text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var newLoc = $("#txtNewLocation").val()
    if ($("#txtNewLocation").val() == '') {
        $('#spnErrormsg').text('Please enter new location').css('color', 'red');
        return;
    }

    inputXML = '<Root><ScanCode>' + $('#txtScanID').val() + '</ScanCode><LocCode>' + $("#txtNewLocation").val() + '</LocCode><EXPSHIROWID>' + EXPSHIROWID + '</EXPSHIROWID><ShipmentLevel>' + ShipmentLevel + '</ShipmentLevel><HouseNo>' + HouseNo + '</HouseNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId><NOP>' + $('#txtNewPcs').val() + '</NOP></Root>';
    console.log(inputXML);
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "SaveBinningDetails_V4",
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
                        // $('#txtNewPcs').val('');
                        $('#divAddTestLocation').empty();
                        // clearALL();

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
                        $('#divAddTestLocation').empty();
                        $('#grid').empty();
                        $('#txtNewPcs').val('');
                        $('#txtNewLocation').val('');
                        $('#txtMHBSNo').val('');


                        //clearALL();
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

function SelectLocationInfo() {
    //alert(a.rowIndex);

    //var xmlDoc = $.parseXML(strXmlStore);
    //console.log(xmlDoc)
    //$(xmlDoc).find('Table').each(function (index) {

    //    if (index == a.rowIndex - 1) {
    //        $('#txtFromLocation').val($(this).find('Location').text());
    //        $('#txtTotalPkg').val($(this).find('LocatedPieces').text());
    //        OldLocationId = $(this).find('LocationId').text();
    //    }

    //});

    var table = document.getElementById("tblNews");
    if (table) {
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].onclick = function () {
                tableText(this);
            };
        }
    }


}

function tableText(tableRow) {
    var location = tableRow.childNodes[0].innerHTML;
    var pcs = tableRow.childNodes[1].innerHTML;
    var Shilevel = tableRow.childNodes[2].innerHTML;
    //  var obj = { 'name': name, 'age': age };

    if (Shilevel != 'H') {
        $('#txtNewPcs').val(pcs).attr('disabled', 'disabled');
    }

    $('#txtCurrentLocation').val(location);
    $('#txtNewLocation').focus();

    // console.log(obj);

}

function clearALL() {
    
    $("#txtMHBSNo").val('');
    $("#txtNewPcs").val('');
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
  //  document.querySelector("#grid").innerHTML = '';
    $('#txtNewLocation').val('');
    $('#txtMHBSNo').val('');
    $('#divAddTestLocation').empty();
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
