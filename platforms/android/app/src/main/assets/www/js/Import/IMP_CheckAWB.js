
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var flightSeqNo;
var ULDSeqNo;
var SavedULDSeqNo;
var isFoundCargo;
var flightPrefix;
var flightNo;
var flightDate;
var selectedRowULDNo;
var selectedRowAWBNo;
var selectedRowHAWBNo;
var selectedRowULDid;
var xmlDamageType, HAWBLists = [];
var dmgType = '';
var HAWB_Flag;
var showAll = 'N';
var ISCROWID;
var IMPSHIPROWID;
var isAutoFlag = 0;
$(function () {

    $("#imgClear").click(function () {
        amplify.store("flightPrefix", "");
        amplify.store("flightNo", "");
        amplify.store("flightDate", "");
    });

    EnableMPSNo();
    flightPrefix = amplify.store("flightPrefix");
    flightNo = amplify.store("flightNo");
    flightDisplayDate = amplify.store("flightDisplayDate");
    flightDate = amplify.store("flightDate");

    selectedRowULDNo = amplify.store("selectedRowULDNo");
    selectedRowAWBNo = amplify.store("selectedRowAWBNo");
    selectedRowHAWBNo = amplify.store("selectedRowHAWBNo");
    selectedRowULDid = amplify.store("selectedRowULDid");

    if (selectedRowULDNo != '') {
        //showAll = 'Y';
        chkShowAll.checked = true;
    }



    $('#txtFltNo').text(flightPrefix.toUpperCase() + flightNo.toUpperCase());
    $('#txtFltDate').text(flightDisplayDate);
    flightSeqNo = amplify.store("flightSeqNo");

    $("#txtScanULD").blur(function () {

        if ($("#txtScanULD").val() != '') {
            var value = this.value;// parseInt(this.value, 10),
            var result = value.replace(/^(.{3})(.{5})(.*)$/, "$1 $2 $3");
            dd = document.getElementById('ddlULDNo'),
                index = 0;

            $.each(dd.options, function (i) {
                if (this.text == result) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                //errmsg = "Please scan/enter valid ULD No.";
                //$.alert(errmsg);
                $('#successMsg').text('Please scan/select valid ULD No.').css('color', 'red');
                return;
            } else {
                $('#successMsg').text('');
            }
            console.log(dd.selectedIndex);
            $('#ddlULDNo').trigger('change');
        }
    });



    $("#hawbLists").blur(function () {

        if ($("#hawbLists").val() != '') {
            var value = this.value;// parseInt(this.value, 10),
            dd = document.getElementById('ddlHAWBNo'),
                index = 0;

            $.each(dd.options, function (i) {
                console.log(this.text);
                if (this.text == value) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                // errmsg = "Please scan/enter valid HAWB No.";
                // $.alert(errmsg);
                $('#successMsg').text('Please scan/enter valid HAWB No.').css('color', 'red');
                return;
            }
            console.log(dd.selectedIndex);
            $('#successMsg').text('');
            $('#ddlHAWBNo').trigger('change');


            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
    });



    $('#ddlDamageType').change(function () {
        dmgType = $(this).val();

    });

    //var stringos = 'ECC,PER,GEN,DGR,HEA,AVI,BUP,EAW,EAP';
    //SHCSpanHtml(stringos);

});

function oneNumberCheck() {
    val = parseInt($('#txtRecievedPkgs').val());
    if (val > 1) {
        $('#successMsg').text('More then 1 pieces not allow.').css('color', 'red');
        $('#txtRecievedPkgs').val('1')
    } else {
        $('#successMsg').text('');
    }

}

function BacktoFlightCheck() {
    // set urs global variable here
    //amplify.store("flightSeqNo", flightSeqNo)
    amplify.store("flightPrefix", flightPrefix)
    amplify.store("flightNo", flightNo)
    amplify.store("flightDate", flightDate)
    window.location.href = 'IMP_FlightCheck.html';
}

function EnableAutoManual() {
    chkAuto = document.getElementById("chkAuto").checked;
    clearALL();
    if (chkAuto == true) {
        $('#txtRecievedPkgs').attr('disabled', 'disabled');
        $('#btnSubmit').attr('disabled', 'disabled');
        $('#txtDamagePkgs').attr('disabled', 'disabled');
        $('#txtDamageWt').attr('disabled', 'disabled');
        $('#ddlDamageType').attr('disabled', 'disabled');

    }

    if (chkAuto == false) {
        $('#txtRecievedPkgs').removeAttr('disabled');
        $('#btnSubmit').removeAttr('disabled');
        $('#txtDamagePkgs').removeAttr('disabled');
        $('#txtDamageWt').removeAttr('disabled');
        $('#ddlDamageType').removeAttr('disabled');
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





function CheckVAlidationHAWB() {
    if (HAWB_Flag == 'M' && $('#ddlHAWBNo').val() == '0') {
        $('#successMsg').text('Please select HAWB No.').css('color', 'red');
        //  $('#hawbLists').focus();
        $('#txtScanGroupId').val('');
        return;
    } else {
        $('#successMsg').text('');
    }
}

function onblurChangeEvent() {
    isAutoFlag = 1;
    GetImportGetCourierDetailsV4();
}

function GetImportGetCourierDetailsV4() {

    // clearPiecesInfoOnGet();
    if ($("#txtScanAWBNo").val() == '') {
        return;
    }

    IsMPSNo = '';
    if (document.getElementById('chkMPSNo').checked) {
        IsMPSNo = 'Y';
    }
    else {
        IsMPSNo = 'N';
    }
    if (document.getElementById('chkAuto').checked) {
        IsAuto = 'Y';
    }
    else {
        IsAuto = 'N';
    }
    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";


    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    inputxml = '<Root><IsMPSNo>' + IsMPSNo + '</IsMPSNo><IsAuto>' + IsAuto + '</IsAuto><FltSeqNo>' + flightSeqNo + '</FltSeqNo><BarCode>' + $("#txtScanAWBNo").val() + '</BarCode><AirportCity>' + AirportCity + '</AirportCity></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImportGetCourierDetailsV4",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                $("body").mLoading('hide');
                $('#ddlDamageType').empty();
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                xmlDamageType = xmlDoc;
                $('#spnErrormsg').text('');

                var DAMAGE_CONTAINER;
                $(xmlDoc).find('Table1').each(function (index) {
                    ISCROWID = $(this).find('ISCROWID').text();
                    IMPSHIPROWID = $(this).find('IMPSHIPROWID').text();
                    AWBNo = $(this).find('AWBNo').text();
                    HouseNo = $(this).find('HouseNo').text();
                    MPSNo = $(this).find('MPSNo').text();
                    NPX = $(this).find('NPX').text();
                    WeightExp = $(this).find('WeightExp').text();
                    NOP = $(this).find('NOP').text();
                    Status = $(this).find('Status').text();
                    DmgPkgs = $(this).find('DmgPkgs').text();
                    DmgWt = $(this).find('DmgWt').text();
                    DAMAGE_CONTAINER = $(this).find('DAMAGE_CONTAINER').text();

                    $('#txtRcvdRem').val(Status);
                    $("#txtAWBNo").val(AWBNo);
                    $("#txtMPSNo").val(MPSNo);
                    $("#hawbLists").val(HouseNo);
                    $("#txtArrivedPkgs").val(NPX);


                    $("#txtDamagePkgsView").val(DmgPkgs);
                    $("#txtDamageWtView").val(DmgWt);
                    $("#txtArrivedPkgs").focus();
                    // $("#txtRecievedPkgs").val(NOP);
                    $("#txtRecievedPkgs").val('1');

                });


                $(xmlDoc).find('Table2').each(function (index) {
                    DamageCode = $(this).find('DamageCode').text();
                    DamageType = $(this).find('DamageType').text();

                    var newOption = $('<option></option>');

                    //if (index == 0) {
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlDamageType');
                    //}

                    newOption.val(DamageCode).text(DamageType);
                    newOption.appendTo('#ddlDamageType');
                    //if (DAMAGE_CONTAINER != "") {
                    //    $("#ddlDamageType").val(DAMAGE_CONTAINER);
                    //}

                });


                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $('#btnMoveDetail').attr('disabled', 'disabled');
                        $('#divVCTDetail').hide();
                        $('#divVCTDetail').empty();
                        $('#ddlDamageType').empty();
                        $("#txtScanAWBNo").val('');
                        $("#txtAWBNo").val('');
                        $("#hawbLists").val('');
                        $("#txtMPSNo").val('');
                        $("#txtRecievedPkgs").val('');
                        $("#txtArrivedPkgs").val('');
                        $("#txtDamagePkgs").val('');
                        $("#txtDamagePkgsView").val('');
                        $("#txtDamageWtView").val('');
                        $("#txtRcvdRem").val('');
                        $("#txtDamageWt").val('');
                        // $("#txtScanAWBNo").focus();

                    } else {
                        // $('#spnErrormsg').text('');
                        $('#btnMoveDetail').removeAttr('disabled');
                        //  $('#btnSubmit').removeAttr('disabled');
                        chkAuto = document.getElementById("chkAuto").checked;

                        if (chkAuto == true && isAutoFlag == 1) {
                            UpdateAWBDetails();
                            isAutoFlag = 0;
                        }
                    }
                });




            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
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

function UpdateAWBDetails() {
    SaveImportCourierDetailsV4();
}



function SaveImportCourierDetailsV4() {
    if ($("#txtScanAWBNo").val() == '') {
        $('#spnErrormsg').text('Please scan number.').css('color', 'red');
        //$("#txtScanAWBNo").focus();
        return;
    }

    var inputXML;
    var serviceName;

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (document.getElementById('chkMPSNo').checked) {
        IsMPSNo = 'Y';
    }
    else {
        IsMPSNo = 'N';
    }
    if (document.getElementById('chkAuto').checked) {
        IsAuto = 'Y';
    }
    else {
        IsAuto = 'N';
    }
    if (dmgType != '') {
        dmgType = $('#ddlDamageType').val();
    }

    inputXML = '<Root><IsMPSNo>' + IsMPSNo + '</IsMPSNo><IsAuto>' + IsAuto + '</IsAuto><FltSeqNo>' + flightSeqNo + '</FltSeqNo><ISCROWID>' + ISCROWID + '</ISCROWID><ISRowID>' + IMPSHIPROWID + '</ISRowID><GroupID></GroupID><NPR>' + $("#txtRecievedPkgs").val() + '</NPR><DMGPsc>' + $("#txtDamagePkgs").val() + '</DMGPsc><DMGWt>' + $("#txtDamageWt").val() + '</DMGWt><DMGCode>' + $("#ddlDamageType").val() + '</DMGCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';
    //inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><ID>' + $('#ddlAWBNo').find('option:selected').val() + '</ID><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    console.log(inputXML)
    serviceName = 'SaveImportCourierDetailsV4';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + serviceName,
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
                console.log(response)
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
                        $('#spnErrormsg').text(StrMessage).css('color', 'green');
                        $('#btnMoveDetail').attr('disabled', 'disabled');
                        $('#divVCTDetail').hide();
                        $('#divVCTDetail').empty();
                        $('#ddlDamageType').empty();
                        $("#txtScanAWBNo").val('');
                        $("#txtAWBNo").val('');
                        $("#hawbLists").val('');
                        $("#txtMPSNo").val('');
                        $("#txtRecievedPkgs").val('');
                        $("#txtArrivedPkgs").val('');
                        $("#txtDamagePkgs").val('');
                        $("#txtDamagePkgsView").val('');
                        $("#txtDamageWtView").val('');
                        $("#txtRcvdRem").val('');
                        $("#txtDamageWt").val('');
                        $("#txtScanAWBNo").focus();

                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    //<Table1>
                    //    <IsMPSNo>N</IsMPSNo>
                    //    <GroupID>20230000000000288</GroupID>
                    //    <BarCode>SBM100</BarCode>
                    //    <IsPrint>Y</IsPrint>
                    //</Table1>
                    IsMPSNo = $(this).find('IsMPSNo').text();
                    GroupID = $(this).find('GroupID').text();
                    AWBNumber = $(this).find('AWBNumber').text();
                    BarCode = $(this).find('BarCode').text();
                    Piece = $(this).find('Piece').text();
                    IsPrint = $(this).find('IsPrint').text();

                    if (IsPrint == 'Y') {
                        PrintGatePass_V4(IsMPSNo, BarCode, AWBNumber, Piece, GroupID);
                    }
                });

                //    PrintGatePass_V4(\'' + MPSNo + '\', \'' + HAWBNo + '\',\'' + MAWBNo + '\', \'' + PkgOfPkgCount + '\',\'' + PackageId + '\');
                // GetImportGetCourierDetailsV4();
            },
            error: function (msg) {

                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
        return false;
    }
}


function PrintGatePass_V4(IsMPSNo, BarCode, AWBNumber, Piece, GroupID) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    IsMPSNo = '';
    if (document.getElementById('chkMPSNo').checked) {
        IsMPSNo = 'Y';
    }
    else {
        IsMPSNo = 'N';
    }

    // var txtGatePassScanNo = $('#txtGatePassScanNo').val().toUpperCase();

    inputxml = '<Root><IsMPSNo>' + IsMPSNo + '</IsMPSNo><BarCode>' + BarCode + '</BarCode><AWBNumber>' + AWBNumber + '</AWBNumber><AirportCity>' + AirportCity + '</AirportCity><Piece>' + Piece + '</Piece><PackageId>' + GroupID + '</PackageId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "PrintGatePass_V4",
            data: JSON.stringify({
                'InputXML': inputxml
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

                //$('#divVCTDetail').html('');
                //$('#divVCTDetail').empty();
                console.log(xmlDoc);
                var sendValueToPrinter = '';
                var StrMessage;
                var CustomInfoStatus = '';
                if (response != null && response != "") {

                    $(xmlDoc).find('Table1').each(function (index) {

                        CustomInfoStatus = $(this).find('CourierStatus').text();

                    });
                    $(xmlDoc).find('Table').each(function (index) {

                        Text = $(this).find('Text').text();
                        Value = $(this).find('Value').text();
                        sendValueToPrinter = $(this).find('Value').text();
                        console.log(Value);
                        if (CustomInfoStatus != 'CLEARED') {
                            finalPRintingSlip(sendValueToPrinter);
                        }

                    });





                } else {
                    //errmsg = 'Data not found.';
                    //$.alert(errmsg);
                    $('#spnValMsg').text("Data not found.").css('color', 'red');
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

function finalPRintingSlip(sendValueToPrinter) {
    console.log(sendValueToPrinter);
    window.DatecsPrinter.listBluetoothDevices(
        function (devices) {
            window.DatecsPrinter.connect(devices[0].address,
                function () {
                    // printLogo();
                    // alert('connection success');
                    PrintCourierData(sendValueToPrinter);


                },
                function () {
                    // alert(JSON.stringify(error));
                }
            );
        },
        function (error) {
            // alert(JSON.stringify(error));
        }
    );

    function PrintCourierData(sendValueToPrinter) {
        // console.log(formatedDataofPRN)
        // alert('final  ' + printedData)
        window.DatecsPrinter.printText(sendValueToPrinter, 'ISO-8859-1',
            function () {

                //  alert('print success');
                // printMyBarcode();
            }
        );
    }
}

function SelectElement(id, valueToSelect) {
    var element = document.getElementById(id);
    element.value = valueToSelect;
}

function onFocusGroupId() {

    if ($('#txtScanGroupId').val().length == 14) {
        if (HAWB_Flag == 'M' && $('#ddlHAWBNo').val() == '0') {
            $('#successMsg').text('Please select HAWB No.').css('color', 'red');
            $('#hawbLists').focus();
            ///  $('#txtScanGroupId').val('');
            return;
        } else {
            $('#successMsg').text('');

            $('#txtArrivedPkgs').focus();
        }

    }

    //if ($('#txtScanGroupId').val().length != 14) {
    //    if (HAWB_Flag == 'M' && $('#ddlHAWBNo').val() == '0') {
    //        $('#successMsg').text('Please select HAWB No.').css('color', 'red');
    //        $('#hawbLists').focus();
    //       // $('#txtScanGroupId').val('');
    //        return;
    //    } else {
    //        $('#successMsg').text('');
    //        $('#txtArrivedPkgs').focus();
    //    }

    //}
    // $('#hawbLists').focus();
}

function foundCargo() {
    if ($('#txtScanGroupIdFoundCargo').val().length == 14) {
        $('#txtFoundPkgs').focus();
    }
}

function onFocusArrivedPkgs() {

    $('#txtArrivedPkgs').focus();

}



function EnableMPSNo() {
    clearALL();
    $("#txtScanAWBNo").focus();
    if (document.getElementById('chkMPSNo').checked) {
        //$('#divNormalCargo').hide();
        //$('#divNormalCargoHawb').hide();
        //$('#divFoundCargo').hide();
        //$('#foundCargoHint').show();
        //$('#divArrivedPkgs').show();
        //$('#divFoundCgoDetails').show();
        //$("#txtScanAWBNo").attr('disabled', 'disabled');
        //$("#ddlAWBNo").attr('disabled', 'disabled');
        //$("#hawbLists").attr('disabled', 'disabled');
        //$("#ddlHAWBNo").attr('disabled', 'disabled');

        //$('#txtMPSNo').focus();
        //$('#ddlDamageType').val(0);
        isFoundCargo = true;

        $('#ddlDamageType').empty();
        //$(xmlDamageType).find('Table5').each(function () {

        //    var AWBId;
        //    var AWBNo;
        //    DamageCode = $(this).find('DamageCode').text();
        //  //  DamageType = $(this).find('DamageType').text();
        //    var newOption = $('<option></option>');
        //    if (index == 0) {
        //        newOption.val(0).text('Select');
        //        newOption.appendTo('#ddlDamageType');
        //    }

        //    newOption.val(DamageCode).text(DamageType);
        //    newOption.appendTo('#ddlDamageType');

        //});

    }
    else {
        $('#divNormalCargo').show();
        $('#divFoundCargo').hide();
        $('#divNormalCargoHawb').show();
        $('#foundCargoHint').hide();
        $('#divArrivedPkgs').show();
        $('#divFoundCgoDetails').hide();
        //$('#ddlDamageType').val(0);
        isFoundCargo = '';

        $('#ddlDamageType').empty();
        //$(xmlDamageType).find('Table5').each(function () {

        //    var AWBId;
        //    var AWBNo;
        //    DamageCode = $(this).find('DamageCode').text();
        //    DamageType = $(this).find('DamageType').text();

        //    var newOption = $('<option></option>');
        //    newOption.val(DamageCode).text(DamageType);
        //    newOption.appendTo('#ddlDamageType');

        //});
    }
}

function clearALL() {

    $('#txtRcvdRem').val('');
    $('#txtRecievedPkgs').val('');
    $('#txtRecievedPkgs').attr('disabled', 'disabled');
    $('#txtAWBNo').val('');
    $('#txtMPSNo').val('')
    $('#txtFoundHAWB').val('');
    $('#txtMnifestedPkg').val('');
    $('#txtArrivedPkgs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#ddlDamageType').val(0);
    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#ddlULDNo').val(0);
    $('#ddlAWBNo').val(0);
    $('#ddlHAWBNo').val(0);
    $('#txtReceivedPkgs').val('');
    $('#txtRemainingPkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWtView').val('');
    $("#hawbLists").val('');
    $("#txtScanGroupId").val('');
    $("#txtScanGroupIdFoundCargo").val('');
    $("#txtScanULD").val('');
    $("#txtScanAWBNo").val('');
    $("#txtScanAWBNo").val('');
    $("#txtScanHAWBNo").val('');
    $("#successMsg").text('');
    // $('#txtScanAWBNo').focus();
    //$('#chkFoundCgo').attr('checked', false);
    //$('#chkShowAll').attr('checked', false);
    $("#TextBoxDiv").empty();
    $('#spnErrormsg').text('');
    // $('#btnSubmit').attr('disabled', 'disabled');
}

function ShowALLRefresh() {
    clearALL();

    GetULDDetails()
}

function clearPiecesInfoOnGet() {
    //  $("#ddlULDNo").trigger('change');
    // GetAWBDetailsForULD($('#ddlULDNo').val())
    $('#txtMnifestedPkg').val('');
    $('#txtArrivedPkgs').val('');
    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#txtReceivedPkgs').val('');
    $('#txtRemainingPkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWtView').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#txtScanGroupId').val('');
    $("#txtScanGroupIdFoundCargo").val('');
    $("#TextBoxDiv").empty();
}

function clearPiecesInfo() {
    //  $("#ddlULDNo").trigger('change');
    // GetAWBDetailsForULD($('#ddlULDNo').val())
    $('#txtMnifestedPkg').val('');
    $('#txtArrivedPkgs').val('');
    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#txtReceivedPkgs').val('');
    $('#txtRemainingPkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWtView').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#txtScanGroupId').val('');
    $("#txtScanGroupIdFoundCargo").val('');
    $("#TextBoxDiv").empty();
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}

