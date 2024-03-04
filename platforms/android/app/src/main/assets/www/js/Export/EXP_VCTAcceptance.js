var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");

var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var VCTNo = window.localStorage.getItem("VCTNo");
var Door = window.localStorage.getItem("Door");
var _RemWeight;
var flightSeqNo;
var ULDSeqNo;
var TotalvolumatricChWt;
var counter = 1;
var HAWBNo;
var RemainingPkg;
var IsBaggage;
var RemainingWt;
var WtUOM;
var IsSecured;
var REFERENCE_DESCRIPTION;
var REFERENCE_DATA_IDENTIFIER;
var REFERENCE_NUMBER_1;
var _xmlDocTable;
var REFERENCE;
var IDENTIFIER;
var nextValue;
var inputRows = '';
var ConsignmentRowID;
var DocumentNo;
var IsSecuredTF;
var selectTestHaWB = 'select';
var _vlaueofTrolleytext;
var MawbNo;
var HawbNo;
var volumatricChWt;

var AL_ROWID_I;
var SDA_ROWID_I;
var SDA_SBNo_C;
var SDA_AWBNumber_C;
var SDA_HAWBNo_C;
var SDA_PackageCount;
var SDA_GrossWt_I;
var SDA_TimeStamp_Dt;
var SDA_LockStatus_I;
var SDA_IsManaual_B;
var SDA_SBDate;
var selectedAWBNo = '';
var aaSDA_SBNo_C;

var TrolleyNo;
var TrolleyGrossWt;
var TrolleyTareWt;
var _TLRowId = '0';
var remPCS;


var HouseNo;
var MHBSNo;
var MPSNo;
var ISULD;
var ConsignRow;
var HouseRowID;
var Package;
var GrossWt;
var TC;
var TW;
var ShipmentLvl;
var inputXMLForsave;
$(function () {


    $('#lblVCTNo').text(VCTNo.toLocaleUpperCase());


});

function HHTGetExportAcceptanceDetails_V4() {
    if ($('#chkAuto').is(':checked')) {
        //$('#txPieces').attr('disabled', 'disabled');
        //$('#txtScaleWt').attr('disabled', 'disabled');
        $('#btnSubmit').attr('disabled', 'disabled');
    }
    else {
        //$('#txPieces').removeAttr('disabled');
        //$('#txtScaleWt').removeAttr('disabled');
        $('#btnSubmit').removeAttr('disabled');
        // $('#txPieces').focus();
    }
    var scannedNo = $('#txtScanAWB').val();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    $('#ddlMAWBNo').empty();
    $('#spnMsg').text('');
    //  $('#spnErrormsg').text('');
    if ($('#txtScanAWB').val() == '') {
        //errmsg = "Please scan/enter AWB No.";
        //$.alert(errmsg);
        return;
    }
    var isChecked = $("#chkAuto").is(":checked");
    var isAuto = isChecked ? 1 : 0;

    var inputXML = '<Root><VCTNo>' + VCTNo + '</VCTNo><ScanCode>' + scannedNo + '</ScanCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>'


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "HHTGetExportAcceptanceDetails_V4",
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
                if (str != null && str != "") {
                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table2').each(function (index) {
                        MHBSNo = $(this).find('MHBSNo').text();
                        // MAWBNo = $(this).find('AWB_Prefix').text()+$(this).find('AWB_Number').text();
                        HAWBNo = $(this).find('HouseNo').text();
                        MPSNo = $(this).find('MPSNo').text();
                        RemPCS = $(this).find('RemPieces').text();
                        RcvPCS = $(this).find('RemWeight').text();
                        _RemWeight = $(this).find('RemWeight').text();
                        RecPieces = $(this).find('RecPieces').text();

                        HouseNo = $(this).find('HouseNo').text();
                        ConsignRow = $(this).find('RowId').text();
                        HouseRowID = $(this).find('EXPHAWBROWID').text();
                        ShipmentLvl = $(this).find('ShipmentLevel').text();

                        $('#txtMHBSNo').val(MHBSNo);


                        // $('#txtMAWBNo').val(MAWBNo);
                        $('#txtHAWB').val(HAWBNo);
                        $('#txtMPSNo').val(MPSNo);

                        //  $('#txtScaleWt').val(RecPieces);
                        $('#txPieces').val(RemPCS);
                        $('#txtScaleWt').val(RecPieces);
                    });
                    $(xmlDoc).find('Table1').each(function (index) {
                        AWBNo = $(this).find('AWBNumber').text();
                        var newOption = $('<option></option>');
                        newOption.val(index + 1).text(AWBNo);
                        newOption.appendTo('#ddlMAWBNo');

                    });
                    var status;
                    $(xmlDoc).find('Table').each(function (index) {
                        status = $(this).find('Status').text();
                        var StrMessage = $(this).find('StrMessage').text();
                        if (status == "E") {
                            $('#spnMsg').text(StrMessage).css('color', 'red');
                            clearALL();
                            return;
                        }
                        //else {
                        //    $('#spnMsg').text(StrMessage).css('color', 'green');
                        //    clearALL();
                        //    return;
                        //}

                        if (isAuto == 1 && status == "S" && ShipmentLvl != undefined && HAWBNo != undefined) {
                            CreateTDGAcceptance_SB_HHT();
                        }
                    });


                }
                else {
                    errmsg = 'VT No. does not exists';
                    // $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                // $.alert(r.Message);
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
    $("#TextBoxDivforSHCCode").html(spanStr);
    return spanStr;

}


function AutoChkCheck() {
    if ($('#chkAuto').is(':checked')) {
        $("#spnMsg").text('');
        //$('#txPieces').attr('disabled', 'disabled');
        //$('#txtScaleWt').attr('disabled', 'disabled');
        $('#btnSubmit').attr('disabled', 'disabled');
    }
    else {
        $("#spnMsg").text('');
        //$('#txPieces').removeAttr('disabled');
        //$('#txtScaleWt').removeAttr('disabled');
        $('#btnSubmit').removeAttr('disabled');
        // $('#txPieces').focus();
    }
}


function dynamicTrCreate(piecesValue) {

    var newTextBoxDiv = $(document.createElement('tr'))
        .attr("id", 'TextBoxDiv' + counter);

    newTextBoxDiv.after().html('<td><input onkeyup="NumberOnly(event);" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Length' + parseInt(counter + 1) + '" onkeypress="MoveToWid(this);"  type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Width' + parseInt(counter + 1) + '" onkeypress="MoveToHei(this);"  type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Height' + parseInt(counter + 1) + '"  type="text" /></td>' +
        '<td><select id="ddlUnit' + parseInt(counter + 1) + '"><option value="cm">cm</option><option value="inch">inch</option></select></td>' +
        '<td><button onclick="removeRow(' + counter + ');" type="button" id="btnAdd" style="background-color: red;" class=""><i class="glyphicon glyphicon-minus"></i></button></td>');


    var one = parseInt($("#Pieces1").val());
    var two = parseInt($("#Pieces2").val());
    var sumOfTwoTextBox = one + two;


    newTextBoxDiv.appendTo("#TextBoxesGroup");
    $("#textpackges1").val(nextValue);
    counter++;

    // }
    GetRemainingPackgs();
    $("#Pieces" + counter).focus();
}


function GetRemainingPackgs() {
    piecesTyped = parseInt($("#txPieces").val());
    $('#TextBoxesGroup').show();
    $("#TextBoxDiv1m").show();
    if ($("#ddlMAWBNo").val() == '0') {
        $("#txPieces").val('');
        errmsg = "Please select MAWB No.</br>";
        $.alert(errmsg);
        return;
    }

    var rpkg = piecesTyped;
    $('#TextBoxesGroup tr').each(function () {

        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                // inputRows += "<Pieces>" + ItemCode + "</Pieces>"
                if ($(this).val() != "") {
                    rpkg = rpkg - parseInt($(this).val());

                }
                else {
                    $(this).val(rpkg);

                }
            }

        });

    });

}

getAllValues = function () {

    inputRows = "";
    TotalvolumatricChWt = 0;
    $('#TextBoxesGroup tr').each(function () {
        volumatricChWt = 0;

        var p, l, w, h;

        inputRows += "<Dims"
        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                inputRows += " P=" + '"' + ItemCode + '"'
                p = ItemCode;
            }
            else if (id.toString().indexOf('Length') != -1) {
                inputRows += " L=" + '"' + ItemCode + '"'
                l = ItemCode;
            }
            else if (id.toString().indexOf('Width') != -1) {
                inputRows += " W=" + '"' + ItemCode + '"'
                w = ItemCode;
            }
            else if (id.toString().indexOf('Height') != -1) {
                inputRows += " H=" + '"' + ItemCode + '"'
                h = ItemCode;
            }


        });

        $(this).find("select").each(function () {

            ItemCodeSelect = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('ddlUnit') != -1) {
                // inputRows += " H=" + '"' + ItemCode + '"'
                inputRows += " U=" + '"' + ItemCodeSelect + '"'
            }



            if (ItemCodeSelect == 'inch') {

                volumatricChWt = (l * w * h * (p / 366));

            } else if (ItemCodeSelect == 'cm') {
                volumatricChWt = (l * w * h * (p / 6000));
            }

            TotalvolumatricChWt += volumatricChWt.toFixed(2);

        });


        inputRows += " V=" + '"' + volumatricChWt.toFixed(3) + '"'
        inputRows += "/>";
    });
}
//"<DimsP =2L =2W = 2H =2/>"
function GetULDDetailsforVCT() {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    $('#ddlULDNo').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CargoWorksServiceURL + "GetVCTULDDetail",
            data: JSON.stringify({
                'strVCTNo': $('#txtVCTNo').val(), 'strCompanyCode': CompanyCode, 'strAirportCity': AirportCity, 'strShedCode': SHEDCODE, 'strUserId': UserId,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table').each(function (index) {

                    var ULDId;
                    var ULD;
                    ULDId = $(this).find('ULDSeqNo').text();
                    ULD = $(this).find('ULDNo').text();

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULD);
                    newOption.appendTo('#ddlULDNo');

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
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

function returnToBack() {

    window.localStorage.setItem("_vctno", VCTNo);
    window.localStorage.setItem("flag", 1);
    window.localStorage.setItem("_Door", Door);

    location.href = 'EXP_EuroPalletAcceptance.html';

}



function CreateTDGAcceptance_SB_HHT() {

    //if ($('#chkAuto').is(':checked')) {
    //    //$('#txPieces').attr('disabled', 'disabled');
    //    //$('#txtScaleWt').attr('disabled', 'disabled');
    //    $('#btnSubmit').attr('disabled', 'disabled');
    //}
    //else {
    //    //$('#txPieces').removeAttr('disabled');
    //    //$('#txtScaleWt').removeAttr('disabled');
    //    $('#btnSubmit').removeAttr('disabled');
    //    // $('#txPieces').focus();
    //}

    if ($('#txtScanAWB').val() == '') {
        $("#spnMsg").text('Please scan/enter No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var GrossWt
    var isChecked = $("#chkSecure").is(":checked");
    var isSecured = isChecked ? 1 : 0;
    var TotalWt = window.localStorage.getItem("TotalWT");
    var RemainingPcs = window.localStorage.getItem("RemaingPcs");

    //if (RemainingPcs != '0') {
    //     GrossWt = TotalWt / RemainingPcs;
    //} else {
    //    GrossWt = '0';
    //}

    var GroupId = $('#txtGroupId').val();

    if ($("#ddlMAWBNo option:selected").text() == "Select") {
        $("#spnMsg").text('Please select MAWB No.').css({ 'color': 'red' });
    } else {
        $("#spnMsg").text('');
    }


    inputXMLForsave = '<Root><VCTNo>' + VCTNo + '</VCTNo><HouseNo>' + HouseNo + '</HouseNo><MHBSNo>' + MHBSNo + '</MHBSNo><MPSNo>' + MPSNo + '</MPSNo><ISULD>False</ISULD><ConsignmentRowID>' + ConsignRow + '</ConsignmentRowID><HouseRowId>' + HouseRowID + '</HouseRowId><Package>1</Package><GrossWt>' + _RemWeight + '</GrossWt><TrolleyCode>-1</TrolleyCode><TrolleyWt>0</TrolleyWt><IsSecured>' + isSecured + '</IsSecured><GroupId>' + GroupId + '</GroupId><ShipmentLevel>' + ShipmentLvl + '</ShipmentLevel><AirportCity>' + AirportCity + '</AirportCity><Culture>en-us</Culture><UserId>' + UserID + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "HHTSaveExportAcceptanceDetails_V4",
            data: JSON.stringify({
                'InputXML': inputXMLForsave
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
                Result = response.d;
                var xmlDoc = $.parseXML(Result);
                $(xmlDoc).find('Table').each(function () {
                    var status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    if (status == "E") {
                        $('#spnMsg').text(StrMessage).css('color', 'red');
                        clearALL();
                        return;
                    }
                    else {
                        $('#spnMsg').text(StrMessage).css('color', 'green');
                        clearALL();
                        return;
                    }
                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}



function clearALL() {

   
    $('#txtMPSNo').val('');
    $('#txtMHBSNo').val('');
    
    $('#txtHAWB').val('');
    // txtMAWBNo make select
    $('#txtGroupId').val('');
    $('#txtScanAWB').val('');
    $('#txPieces').val('');
    $('#txtScaleWt').val('');
    $('#ddlEquTrolley').val(0);
    $('#ddlAWBNo').val(0);
    // $('#ddlMAWBNo').val(0);
    $('#ddlMAWBNo').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlMAWBNo');

    //
    selectedAWBNo = '';
    $('#btnSubmit').attr('disabled', 'disabled');
    $('#txtGroupId').attr('disabled', 'disabled');
    $('#txPieces').attr('disabled', 'disabled');
    $('#txtScaleWt').attr('disabled', 'disabled');
    $('#ddlEquTrolley').attr('disabled', 'disabled');
    $('#addButton').attr('disabled', 'disabled');

    // $('#TextBoxesGroup').empty();
    $('#TextBoxesGroup').hide();
    // $('#TextBoxDiv1m').empty();
    $("#TextBoxDivforSHCCode").empty();
    $('Pieces1').val('');
    $('Length1').val('');
    $('Width1').val('');
    $('Height1').val('');
    $('ddlUnit1').val('');


    $('#Pieces1').hide();
    $('#Length1').hide();
    $('#Width1').hide();
    $('#Height1').hide();
    $('#ddlUnit1').hide();

    $('#txtManiPieces').val('');
    $('#txtReceivePieces').val('');
    $('#txtManiGrWt').val('');
    $('#txtReceiveGrWt').val('');
    $('#txtShortPieces').val('');
    $('#txtExcessPieces').val('');
    $('#txtDamagePieces').val('');


    $('#NetWt').text('');
    $('#TareWt').text('');
    // $('#lblVCTNo').text('');
    // $('#spnMsg').text('');
    $('#txtScanAWB').focus();
    

}

function MoveToLen(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Length' + index).focus();
    }
}
